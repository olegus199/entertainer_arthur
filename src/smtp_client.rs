use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};

#[derive(Debug)]
pub struct MessageReq {
    pub from: String,
    pub to: String,
    pub subject: String,
    pub body: String,
    pub creds: Credentials,
    pub smtp_addr: String,
}

pub async fn send_message(message: MessageReq) {
    let email = Message::builder()
        .from(message.from.parse().unwrap())
        .to(message.to.parse().unwrap())
        .subject(message.subject)
        .header(ContentType::TEXT_PLAIN)
        .body(message.body)
        .unwrap();

    // Open a remote connection to gmail using STARTTLS
    let mailer: AsyncSmtpTransport<Tokio1Executor> =
        AsyncSmtpTransport::<Tokio1Executor>::starttls_relay(
            &message.smtp_addr,
        )
        .unwrap()
        .credentials(message.creds)
        .build();

    // Send the email
    match mailer.send(email).await {
        Ok(_) => tracing::info!("Email sent successfully!"),
        Err(e) => tracing::error!("Could not send email: {e:?}"),
    }
}
