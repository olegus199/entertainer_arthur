use std::net::SocketAddr;

use time::{Duration, OffsetDateTime};

use crate::{
    Request, ALLOWED_REQUESTS_IN_TIME_INTERVAL,
    REQUEST_TIME_INTERVAL_MINUTES_LIMIT,
};

pub struct Client {
    pub ip: SocketAddr,
    pub requests: Vec<Request>,
}

impl Client {
    pub fn add_request(&mut self, req: Request) {
        self.requests.push(req);
    }

    pub fn allowed_to_handle_unsorted(&self) -> (bool, usize) {
        let now = OffsetDateTime::now_utc();
        let fresh_requests_count = self
            .requests
            .iter()
            .filter(|r| {
                (now - datetime)
                    < Duration::minutes(REQUEST_TIME_INTERVAL_MINUTES_LIMIT)
            })
            .count();

        (
            fresh_requests_count <= ALLOWED_REQUESTS_IN_TIME_INTERVAL,
            fresh_requests_count,
        )
    }
    pub fn allowed_to_handle_sorted(&self) -> bool {
        let now = OffsetDateTime::now_utc();
        let fresh_requests_count = self
            .requests
            .iter()
            .rev()
            .take(ALLOWED_REQUESTS_IN_TIME_INTERVAL + 1)
            .filter(|r| {
                if let Some(datetime) = r.datetime {
                    (now - datetime)
                        < Duration::minutes(REQUEST_TIME_INTERVAL_MINUTES_LIMIT)
                } else {
                    false
                }
            })
            .count();

        fresh_requests_count <= ALLOWED_REQUESTS_IN_TIME_INTERVAL
    }
}
