# Validation Service

[![Go Report Card](https://goreportcard.com/badge/github.com/spacemakerai/spacemaker-docker-kubernetes-course)](https://goreportcard.com/report/github.com/spacemakerai/spacemaker-docker-kubernetes-course)

HTTP service for validating that a set of buildings follows necessary
constraints.

## Data structure

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

## Validation rules

The validation service will validate that:

1. All buildings are within bounds, which means `x` and `y` are equal to or
   greater than 0, `x + dx` less than or equal to 100 and `y + dy` less than or
   equal to 50.
2. All buildings have a size larger than 0, that is `dx` and `dy` are larger than 0.
3. Buildings are no taller than 20, that is `dz` less than or equal to 20.
4. Buildings are no larger than 20, that is `dx` and `dy` are less than or equal
   to 20.
5. No buildings overlap and have at least 2 spaces in between, that is `x1 + dx1 + 2 < x2` and `y1 + dy1 + 2 <= y2`.

## API documentation

### `POST /validate-buildings`

Validates a set of buildings. Input:

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
{
  "isValid": true / false, // overall flag if the set of buildings is valid or not
  "errorMessage": "...", // if there's an overall error message
  "validationResults": [
    // a list of error messages per building
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
}
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
