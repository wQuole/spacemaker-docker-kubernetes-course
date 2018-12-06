# Validation Service

## Hacking

Run the server with the following command:

```bash
$ go run main.go
```

Server now available at `http://localhost:8080/`.

## Hacking with docker

Build the docker image with the following command:

```bash
$ docker build . -t validation-service
```

Run the docker image with the following command:

```bash
$ docker run -p 8080:8080 -t validation-service
```

Server now available at `http://localhost:8080/`.

To push the image to Docker Hub, first log in:

```bash
$ docker login
```

Then push the image:

```bash
docker tag validation-service hakonamdal/validation-service
docker push hakonamdal/validation-service
```

## Deploying to kubernetes

First, you need to install and set the context:

```bash
$ gcloud container clusters get-credentials abakus --zone europe-west1-b \
--project spacemaker-kubernetes-workshop
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f validation-service.yaml
```
