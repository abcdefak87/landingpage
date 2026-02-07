FROM rust:latest AS build
WORKDIR /app
COPY Cargo.toml ./
COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/target/release/unnet-backend /app/unnet-backend
COPY unnet.db /app/
EXPOSE 9000
CMD ["./unnet-backend"]
