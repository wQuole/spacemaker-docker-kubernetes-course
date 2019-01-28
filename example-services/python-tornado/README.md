# Spacemaker Python Tornado example

Example spacemaker service, written in Python with the
[Tornado](http://www.tornadoweb.org/en/latest/) web framework.

Compared to to the `python-flask` example service, this service uses `pipenv`.

## Usage

### `GET /`

Returns a list of buildings in the following format:

```json
[{ "x": 0, "y": 0, "dx": 20, "dy": 20, "dz": 20 }, { "x": 40, "y": 40, "dx": 20, "dy": 20, "dz": 40 }]
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
$ docker build . -t spacemaker-python-tornado
```

Run the service:

```bash
$ docker run -p 8888:8888 -t spacemaker-python-tornado
```

Server now running on `http://localhost:8888/`.

Pushing to dockerhub:

```bash
$ docker login
$ docker tag spacemaker-python-tornado <dockerhub id>/spacemaker-python-tornado
$ docker push <dockerhub id>/spacemaker-python-tornado
```

## Deploying to kubernetes

First, you need to install and set the context:

```bash
$ gcloud container clusters get-credentials abakus --zone europe-west1-b \
--project spacemaker-kubernetes-workshop
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f spacemaker-python-tornado.yaml
```
