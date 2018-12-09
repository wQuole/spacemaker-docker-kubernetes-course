FROM rust:1.29.2

WORKDIR /app
COPY . .

RUN cargo build --release

EXPOSE 8080

CMD ["/app/target/release/spacemaker-course-example-rust"]
