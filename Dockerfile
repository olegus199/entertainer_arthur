################################################################################
# Create a stage for building the application.

ARG RUST_VERSION=1.81
ARG APP_NAME=entertainer_arthur
FROM rust:${RUST_VERSION}-slim-bookworm AS build
ARG APP_NAME
WORKDIR /app

RUN apt update && apt install libssl-dev pkg-config -y

RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=bind,source=benches,target=benches \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    set -e && \
    RUSTFLAGS='-C target-feature=-crt-static' cargo build --locked --release && \
    cp ./target/release/$APP_NAME /app/$APP_NAME

################################################################################
# Create a stage for running the application.
FROM debian:bookworm-slim AS final

RUN apt update && apt install -y ca-certificates curl

# Create a non-privileged user that the app will run under.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser


WORKDIR /app
# Copy the executable from the "build" stage.
COPY --from=build /app/$APP_NAME /app/$APP_NAME
COPY config.yaml /app/config.yaml

# Expose the port that the application listens on.
EXPOSE 15100

# What the container should run when it is started.
CMD ["/app/entertainer_arthur"]

