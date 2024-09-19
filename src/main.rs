use std::net::SocketAddr;
use std::sync::Arc;
use std::sync::Mutex;

use axum::extract::ConnectInfo;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing;
use axum::Form;
use axum::Router;
use entertainer_arthur::client::Client;
use entertainer_arthur::config::Settings;
use entertainer_arthur::format_phone_number;
use entertainer_arthur::smtp_client::send_message;
use entertainer_arthur::smtp_client::MessageReq;
use entertainer_arthur::Request;
use entertainer_arthur::MONTHS;
use entertainer_arthur::RE;
use entertainer_arthur::WEEKDAYS;
use lettre::transport::smtp::authentication::Credentials;
use secrecy::ExposeSecret;
use time::OffsetDateTime;
use time::UtcOffset;
use tokio::net::TcpListener;

use garde::Validate;
use tracing::Level;
use tracing_subscriber::fmt::format::FmtSpan;

lazy_static::lazy_static! {
    static ref MOSKOW_TIME_OFFSET: UtcOffset = UtcOffset::from_hms(3, 0, 0).unwrap();
}

#[derive(Clone, Default)]
struct AppState {
    clients: Arc<Mutex<Vec<Client>>>,
    settings: Arc<Settings>,
}

impl AppState {
    fn try_create_request(&self, addr: &SocketAddr, req: Request) -> Result<(), String> {
        let Ok(mut lock_clients) = self.clients.lock() else {
            return Err("Can't acquire mutex lock".to_owned());
        };
        if let Some(client) = lock_clients.iter_mut().find(|c| c.ip.eq(addr)) {
            let (allowed_to_handle_unsorted, count) = client.allowed_to_handle_unsorted();
            if allowed_to_handle_unsorted {
                client.add_request(req);
                tracing::info!(
                    "Added new request for ip: {}, fresh requests count: {}",
                    addr,
                    count
                );
                return Ok(());
            }
            tracing::error!("Failed to create request, limit exceeded: {count} fresh requests");
            return Err("Not allowed to create request".to_owned());
        } else {
            lock_clients.push(Client {
                ip: addr.clone(),
                requests: vec![req],
            });
            return Ok(());
        }
    }
}

#[tokio::main]
async fn main() {
    let subscriber = tracing_subscriber::fmt()
        .with_timer(tracing_subscriber::fmt::time::ChronoLocal::default())
        .with_span_events(FmtSpan::NEW | FmtSpan::CLOSE)
        .with_env_filter(
            tracing_subscriber::EnvFilter::from_default_env()
                .add_directive(Level::INFO.into())
                .add_directive("axum::rejection=trace".parse().unwrap())
                .add_directive("tower_sessions_core=warn".parse().unwrap())
                .add_directive("aws_config=warn".parse().unwrap()),
        )
        .compact()
        .with_level(true)
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("Failed to set up tracing");

    tracing::info!("Starting entertainer_arthur on 15100 port..");
    let listener = TcpListener::bind("0.0.0.0:15100").await.unwrap();

    let app = Router::new()
        .route("/api/message", routing::post(post_message))
        .route("/api/health", routing::post(health_check))
        .with_state(AppState::default());

    let _ = axum::serve(
        listener,
        app.into_make_service_with_connect_info::<std::net::SocketAddr>(),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await;
}

async fn post_message(
    State(state): State<AppState>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Form(mut request): Form<Request>,
) -> StatusCode {
    if let Err(e) = request.validate(&()) {
        tracing::error!("Failed to validate: {e}");
        return StatusCode::BAD_REQUEST;
    }

    // Store datetime in request
    request.datetime = Some(time::OffsetDateTime::now_utc());

    match state.try_create_request(&addr, request.clone()) {
        Ok(()) => {
            let from = format!("Guest <{}>", &state.settings.backend_email);
            let to = format!("Admin <{}>", &state.settings.admin_email);
            let mut body = format!(
                "{}, номер телефона: {}\n\n{}",
                request.name,
                format_phone_number(
                    &request
                        .number
                        .format()
                        .mode(phonenumber::Mode::E164)
                        .to_string()
                ),
                request.message
            );
            let subject = format!("Обращение от {}", request.name);

            if let Some(datetime) = request.datetime {
                let date = datetime.to_offset(MOSKOW_TIME_OFFSET.clone());
                match translate_rfc2822_timestamp(date) {
                    Ok(s) => {
                        body.push_str("\n\n");
                        body.push_str(&s);
                    }
                    Err(e) => {
                        tracing::error!("Failed to format date: {e}")
                    }
                }
            }

            let message = MessageReq {
                from,
                to,
                subject,
                body,
                creds: Credentials::new(
                    state.settings.backend_username.clone(),
                    state
                        .settings
                        .backend_email_password
                        .expose_secret()
                        .clone(),
                ),
                smtp_addr: state.settings.smtp_addr.clone(),
            };
            tracing::info!("Created message request: {:?}", message);
            send_message(message).await;
            StatusCode::OK
        }
        Err(e) => {
            tracing::warn!(
                "Failed to create request for ip: {}, caused by: {}",
                addr,
                e
            );
            StatusCode::FORBIDDEN
        }
    }
}

async fn health_check() -> impl IntoResponse {
    StatusCode::OK
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };
    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };
    tokio::select! {
        () = ctrl_c => {},
        () = terminate => {},
    }
    tracing::info!("Terminate signal received");
}

fn get_date_string(date: OffsetDateTime) -> Result<String, time::error::Format> {
    let format = time::format_description::well_known::Rfc2822;
    date.format(&format)
}

fn translate_rfc2822_timestamp(timestamp: OffsetDateTime) -> Result<String, time::error::Format> {
    let formatted = get_date_string(timestamp)?;
    if let Some(captures) = RE.captures(&formatted) {
        let weekday = captures.get(1).unwrap().as_str();
        let day = captures.get(2).unwrap().as_str();
        let month = captures.get(3).unwrap().as_str();
        let year = captures.get(4).unwrap().as_str();
        let time = captures.get(5).unwrap().as_str();

        let translated_weekday = WEEKDAYS.get(&weekday).unwrap();
        let translated_month = MONTHS.get(&month).unwrap();

        Ok(format!(
            "{translated_weekday}, {day} {translated_month} {year} {time}"
        ))
    } else {
        Ok(formatted)
    }
}

#[cfg(test)]
mod tests {

    use std::{
        iter::repeat,
        net::{Ipv4Addr, SocketAddrV4},
    };

    use entertainer_arthur::client::Client;
    use time::OffsetDateTime;

    use crate::{translate_rfc2822_timestamp, Request};

    #[test]
    fn test_translation() {
        let test_cases = vec![
            (
                "Thu, 01 Jan 1970 00:00:00 +0000",
                "Четверг, 01 Января 1970 00:00:00 +0000",
            ),
            (
                "Fri, 16 Feb 2024 13:10:00 +0000",
                "Пятница, 16 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Sat, 17 Feb 2024 13:10:00 +0000",
                "Суббота, 17 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Sun, 18 Feb 2024 13:10:00 +0000",
                "Воскресенье, 18 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Mon, 19 Feb 2024 13:10:00 +0000",
                "Понедельник, 19 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Tue, 20 Feb 2024 13:10:00 +0000",
                "Вторник, 20 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Wed, 21 Feb 2024 13:10:00 +0000",
                "Среда, 21 Февраля 2024 13:10:00 +0000",
            ),
            (
                "Fri, 01 Mar 2024 13:10:00 +0000",
                "Пятница, 01 Марта 2024 13:10:00 +0000",
            ),
            (
                "Mon, 01 Apr 2024 13:10:00 +0000",
                "Понедельник, 01 Апреля 2024 13:10:00 +0000",
            ),
            (
                "Wed, 01 May 2024 13:10:00 +0000",
                "Среда, 01 Мая 2024 13:10:00 +0000",
            ),
            (
                "Sat, 01 Jun 2024 13:10:00 +0000",
                "Суббота, 01 Июня 2024 13:10:00 +0000",
            ),
            (
                "Mon, 01 Jul 2024 13:10:00 +0000",
                "Понедельник, 01 Июля 2024 13:10:00 +0000",
            ),
            (
                "Thu, 01 Aug 2024 13:10:00 +0000",
                "Четверг, 01 Августа 2024 13:10:00 +0000",
            ),
            (
                "Sun, 01 Sep 2024 13:10:00 +0000",
                "Воскресенье, 01 Сентября 2024 13:10:00 +0000",
            ),
            (
                "Tue, 01 Oct 2024 13:10:00 +0000",
                "Вторник, 01 Октября 2024 13:10:00 +0000",
            ),
            (
                "Fri, 01 Nov 2024 13:10:00 +0000",
                "Пятница, 01 Ноября 2024 13:10:00 +0000",
            ),
            (
                "Sun, 01 Dec 2024 13:10:00 +0000",
                "Воскресенье, 01 Декабря 2024 13:10:00 +0000",
            ),
            (
                "Wed, 01 Jan 2025 13:10:00 +0000",
                "Среда, 01 Января 2025 13:10:00 +0000",
            ),
            // Add more test cases for different dates and times
        ];

        for (input, expected_output) in test_cases {
            let input_date =
                OffsetDateTime::parse(input, &time::format_description::well_known::Rfc2822)
                    .unwrap();
            let translated = translate_rfc2822_timestamp(input_date).unwrap();
            assert_eq!(translated, expected_output);
        }
    }

    fn make_request() -> Request {
        Request {
            name: "Some name".to_owned(),
            email: "any@gmail.con".to_owned(),
            number: "+79999999999".parse().unwrap(),
            message: "Hello world".to_owned(),
            datetime: Some(OffsetDateTime::now_utc()),
        }
    }

    #[test]
    fn can_handle_allows_requests() {
        let request = make_request();
        let client = Client {
            ip: std::net::SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(1, 1, 1, 1), 1)),
            requests: repeat(request).take(5).collect(),
        };
        assert!(client.allowed_to_handle_sorted())
    }

    #[test]
    fn can_handle_rejects_if_limit_exceeded() {
        let request = make_request();
        let client = Client {
            ip: std::net::SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(1, 1, 1, 1), 1)),
            requests: repeat(request).take(6).collect(),
        };
        assert!(!client.allowed_to_handle_sorted())
    }
}
