# Validation Service

[![Go Report Card](https://goreportcard.com/badge/github.com/spacemakerai/spacemaker-docker-kubernetes-course)](https://goreportcard.com/report/github.com/spacemakerai/spacemaker-docker-kubernetes-course)

HTTP service for validating buildings.

Buildings are represented in this JSON data structure:

```json
{
  "x": 1,
  "y": 1,
  "dx": 5,
  "dy": 5,
  "dz": 5
}
```

## `POST /validate-building`

Post a building in the above format to the `/validate-building` endpoint and
receive a response on the following format:

```json
{
  "isValid": true / false,
  "errorMessage": "..."
}
```

If the building is valid, there will be no error message. If the building is
invalid, the `errorMessage` field will indicate the validation error.

## `POST /validate-buildings`

Just like above, but for a set of buildings. Input:

```json
[
  {
    // building 1
  },
  {
    // building 1
  },
  ...{
    // building n
  }
]
```

Output will be in the following format:

```json
[
  {
    // Validation result for building 1
  },
  {
    // Validation result for building 2
  },
  ...{
    // Validation result for building n
  }
]
```

## Hacking

Run the server with the following command:

```bash
$ go run cmd/server/main.go
```

Server now available at `http://localhost:8080/`.

Run the tests with the following command:

```bash
$ go test ./...
```

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
$ docker tag validation-service hakonamdal/validation-service
$ docker push hakonamdal/validation-service
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
