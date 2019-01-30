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
$ docker build . -t spacemaker-rust
```

Run the docker image with the following command:

```bash
$ docker run -p 3003:3003 -t spacemaker-rust
```

Server now available at `http://localhost:8080/`.

To push the image to Docker Hub, first log in:

```bash
$ docker login
```

Then push the image:

```bash
docker tag spacemaker-rust havardh/spacemaker-rust
docker push havardh/spacemaker-rust
```

## Deploying to kubernetes

First, you need to install and set the context:

```bash
$ gcloud container clusters get-credentials abakus --zone europe-west1-b \
--project spacemaker-kubernetes-workshop
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f manifest.yaml
```
