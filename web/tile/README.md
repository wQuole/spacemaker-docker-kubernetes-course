# Spacemaker course tile web application

Frontend application to show and evaluate solutions.

## Run docker image locally

```bash
$ docker run -d -p 8080:80 -e LOCAL_MODE=1 -e LOCAL_PORT=3003 havardh/spacemaker-tile
```

The frontend starts at http://localhost:8080 and calls a single service on
http://localhost:3003. The port of the local service can be set with the
`LOCAL_PORT` variable.

## Developing

The project runs on a webpack dev server with a proxy to
abakus.spacemaker.ai/services. Install dependencies and start with:

```bash
$ yarn
$ yarn start
```

## Deploying

Build a docker image

```bash
$ docker build . -t spacemaker-tile
```

Tag it locally

```bash
$ docker tag spacemaker-tile havardh/spacemaker-tile
```

Push to hub.docker.com

```bash
$ docker push havardh/spacemaker-tile
```

Deploy to kubernetes

```bash
$ kubectl apply -f spacemaker-tile.yaml
```
