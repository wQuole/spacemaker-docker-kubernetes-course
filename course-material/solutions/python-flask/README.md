# Spacemaker Python Flask example

Simple HTTP web server using (Flask)[http://flask.pocoo.org/].

## Usage

### `GET /`

Returns a list of buildings in the following format:

```json
[{ "x": 0, "y": 0, "dx": 20, "dy": 20, "dz": 20 }, { "x": 40, "y": 40, "dx": 20, "dy": 20, "dz": 40 }]
```

## Hacking

To run the service locally, you need `pip` and preferrably `virtualenv`
installed on your computer. To set up a virtualenv and install the dependencies,
run the following commands:

```bash
# As good citicens of the world, we're no longer using Python2
$ virtualenv -p python3 venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

To start the server, run:

```bash
$ python server.py
```

Server now runs at `http://localhost:5000/`.

## Docker

Build the docker image with the following command:

```bash
$ docker build -t spacemaker-python-flask .
```

Run the docker image with port forwarding:

```bash
$ docker run -p 5000:5000 spacemaker-python-flask
```

## Deploing

First, push the image to DockerHub:

```bash
$ docker tag spacemaker-python-flask hakonamdal/spacemaker-python-flask
$ docker push hakonamdal/spacemaker-python-flask
```

Then apply the kubernetes configuration by running:

```bash
$ kubectl apply -f manifest.yaml
```
