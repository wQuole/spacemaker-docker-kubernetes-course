FROM rust:1.29.2 as build

RUN USER=root cargo new --bin spacemaker-course-example-rust
WORKDIR /spacemaker-course-example-rust

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN cargo build --release
RUN rm src/*.rs
RUN rm ./target/release/deps/spacemaker_course_example_rust*

COPY ./src ./src

RUN cargo build --release

FROM debian:jessie-slim
COPY --from=build /spacemaker-course-example-rust/target/release/spacemaker-course-example-rust /bin/spacemaker-course-example-rust
EXPOSE 3003
ENTRYPOINT ["spacemaker-course-example-rust"]
