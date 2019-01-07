# Spacemaker Python example

Example spacemaker service, written in Python with the
[Tornado](http://www.tornadoweb.org/en/latest/) web framework.

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
$ docker build . -t spacemaker-python
```

Run the service:

```bash
$ docker run -p 8888:8888 -t spacemaker-python
```

Server now running on `http://localhost:8888/`.

Pushing to dockerhub:

```bash
$ docker login
$ docker tag spacemaker-python <dockerhub id>/spacemaker-python
$ docker push <dockerhub id>/spacemaker-python
```

## Deploying to kubernetes

First, you need to install and set the context:

```bash
$ gcloud container clusters get-credentials abakus --zone europe-west1-b \
--project spacemaker-kubernetes-workshop
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f spacemaker-python.yaml
```
