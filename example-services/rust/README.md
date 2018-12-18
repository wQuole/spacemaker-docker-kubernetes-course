# Hello world rust example service

## Devlopment

Run the server with the following command:

```bash
$ cargo run
```

Server now available at `http://localhost:8080/`.

## Hacking with docker

Build the docker image with the following command:

```bash
$ docker build . -t rust-service
```

Run the docker image with the following command:

```bash
$ docker run -p 8080:8080 -t rust-service
```

Server now available at `http://localhost:8080/`.

To push the image to Docker Hub, first log in:

```bash
$ docker login
```

Then push the image:

```bash
docker tag rust-service havardh/rust-service
docker push havardh/rust-service
```
