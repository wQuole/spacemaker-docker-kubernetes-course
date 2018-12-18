# Hello world node example service

## Install

```bash
yarn
```

## Devlopment

Run the server with the following command:

```bash
yarn dev
```

Server now available at `http://localhost:8000/`.

## Hacking with docker

Build the docker image with the following command:

```bash
docker build . -t node-service
```

Run the docker image with the following command:

```bash
docker run -p 8080:8080 -t node-service
```

Server now available at `http://localhost:8000/`.

To push the image to Docker Hub, first log in:

```bash
docker login
```

Then push the image:

```bash
docker tag rust-service DOCKERHUB_USERNAME/node-service
docker push DOCKERHUB_USERNAME/node-service
```
