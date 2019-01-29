# Java example application

## Development

Start the application on http://localhost:8090

```bash
$ ./mvnw spring-boot:run
```

The port can be changed in `resources/application.properties` or by adding
`-Drun.arguments=--server.port=8085` to the end of the command above.

## Deployment

### Publish to docker hub

```bash
$ ./mvnw package # generates target/java-example-0.0.1-SNAPSHOT.jar
$ docker build . -t spacemaker-java
$ docker tag spacemaker-java havardh/spacemaker-java
$ docker push havardh/spacemaker-java
```

### Publish to kubernetes

```
kubectl apply -f spacemaker-java.yaml
```
