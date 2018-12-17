# Hello world Python example

"Hello world" example application, written in Python with the
[Tornado](http://www.tornadoweb.org/en/latest/) web framework.

## Usage

### `POST hello/`

Example input:

```json
{
  "name": "Håkon"
}
```

Response:

```json
{
  "greeting": "Hello, Håkon!"
}
```

## Hacking

Run the server with the following command:

```bash
$ pipenv run dev-server
```

Server now running on `http://localhost:8888/`.

## Docker

Build the image:

```bash
$ docker build . -t hello-python
```

Run the service:

```bash
$ docker run -p 8888:8888 -t hello-python
```

Server now running on `http://localhost:8888/`.

Pushing to dockerhub:

```bash
$ docker login
$ docker tag hello-python <dockerhub id>/hello-python
$ docker push <dockerhub id>/hello-python
```

## Deploying to kubernetes

First, you need to install and set the context:

```bash
$ gcloud container clusters get-credentials abakus --zone europe-west1-b \
--project spacemaker-kubernetes-workshop
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f hello-python.yaml
```
