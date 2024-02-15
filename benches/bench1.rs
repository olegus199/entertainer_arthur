// benches/my_benchmark.rs

use std::{
    iter::repeat,
    net::{Ipv4Addr, SocketAddrV4},
};

use criterion::{criterion_group, criterion_main, Criterion};
use entertainer_arthur::{client::Client, Request};
use time::OffsetDateTime;

fn make_client(request_count: usize) -> Client {
    let request = Request {
        name: "Some name".to_owned(),
        email: "any@gmail.con".to_owned(),
        number: "+79999999999".to_owned(),
        message: "Hello world".to_owned(),
        datetime: Some(OffsetDateTime::now_utc()),
    };
    Client {
        ip: std::net::SocketAddr::V4(SocketAddrV4::new(
            Ipv4Addr::new(1, 1, 1, 1),
            1,
        )),
        requests: repeat(request).take(request_count).collect(),
    }
}

fn benchmark_evaluating_request_access(c: &mut Criterion) {
    c.bench_function("with_sorted_vec", |b| {
        b.iter(|| {
            let client = make_client(10000);
            let _ = client.allowed_to_handle_sorted();
        });
    });
    c.bench_function("with_unsorted_vec", |b| {
        b.iter(|| {
            let client = make_client(10000);
            let _ = client.allowed_to_handle_unsorted();
        });
    });
}

criterion_group!(
    name = benches;
    config = Criterion::default();
    targets = benchmark_evaluating_request_access
);
criterion_main!(benches);
