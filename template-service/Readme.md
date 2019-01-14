# Spacemaker service template

This folder contains a minimal template to solve the workshop assignment.
To solve the assignment, you will need to 1 add a web server, 2 write the
Dockerfile, 3 write the service.yml, and 4 push the docker image and deploy
the service. If you get stuck you can look in the [example-services] folder to
find examples on how to solve the assignment in [java](../example-services/java),
[javascript](../example-services/node), [python](../example-services/python) and
[rust](../example-services/rust).

## Assignment

### Breakdown

1.  Create a http web server in a language of your choice
2.  Create a docker image which contains your server
3.  Create the Kubernetes deployment configuration
4.  Deploy your server to abakus.spacemaker.ai

If you complete all of these steps, then each of the first three includes extra
optional steps. You can pick the ones which interests you the most.

#### Creating a web server

a) Pick your language (and framework) to implement the web server with.

b) Write a simple web server which accepts a GET request on the root path ('/').

c) Make the web server respond with a JSON response to the request with the
following payload:

```
[
  {
    x: 5,
    y: 5,
    dx: 20,
    dy: 30,
    dz: 6
  }
]
```

(This means place a 30x20 meters building with a height of 9 meters, 5 meters
from the top and left edges)

You can test your server using `curl localhost:8080` assuming that your server
runs on port 8080. It should reply with the JSON structure above.

(optional) d) Place the buildings in a fixed, but personalized layout.

(optional) e) Write an algorithm for optimizing the placement of the buildings.
You can look in the [`analysis-service`](../platform-services/analysis-service)
for the rules which you solution is evaluated based on.

(there is a small prize for the _best_ solution)

#### Create a docker image for you server.

The following are the generally required steps to create a docker image. For
your language of choice the might be additional or fewer steps. A simple
google search might reveal the best practice for your choice. These steps should
be done in the [Dockerfile](./Dockerfile).

a) Add a base image to your `Dockerfile` (`FROM <image-name>:<tag>`)
a.1) Add missing build dependencies, if they are not included in your base image

b) Copy the source code from you project folder into the image (`COPY <path on host> <path on image>`)

c) Apply the build command for your language (e.g. `RUN npm install`)

d) Add the command which starts your server (e.g. `node index.js`)

e) Build your service with `docker build . -t <your-docker-image-name>`
Run it with `docker run -it -d -p <port> <your-docker-image-name>`

You can now verify your server with the same `curl localhost:<port>` command.

(optional) f) Reduce the size of the resulting docker images as much as possible.
Hint: docker supports layered builds, where you first set up a `build` image
which produces a binary file, this file is then copied to a `run` image
which is capable of running the binary, but much smaller than `build` image.
See [validation-service](../platform-services/validation-service/Dockerfile)
and [services-service](../platform-services/services-service/Dockerfile) for examples.

(there is a small prize for the smallest working image)

(optional) g) Make your Docker build run the minimal number of step for each
subsequent builds. Your local installation of Docker includes a cache which it
will use to reduce the number of operations it will do.
Examples of typical reductions includes:

- Avoid reinstall platform build dependencies on each build
- Avoid reinstall code dependencies when only code has changed.

#### Create the Kubernetes deployment configuration

These steps should be done in [service.yml](./service.yml)

a) Pick an url for your application. It will be mounted on
abakus.spacemaker.ai/<your-choice-or-url>

b) Add a Deployment `kind: Deployment`

c) Add a Service `kind: Service`

d) Add an Ingress `kind: Ingress`

(optional) e) Configure the resource utilization appropriate for your langauge.

#### Deploy the service to Kubernetes

a) Tag your docker image. `docker tag <image-name> <username>:<image-name>`

b) Push your docker image to Dockerhub. `docker push <username>:<image-name>`

c) Deploy the service to Kubernetes `kubectl apply -f service.yml`
