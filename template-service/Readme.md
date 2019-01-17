# Spacemaker service template

This folder contains a template and text for the workshop assignment.
To solve the it, you will need to _add a web server_, _write the
Dockerfile_, _write the service.yml_, and _push the docker image and deploy
the service_. If you get stuck you can look at the example services to
find examples on how to solve the assignment in [java](../example-services/java),
[javascript](../example-services/node), [python](../example-services/python) and
[rust](../example-services/rust).

## Assignment

### Breakdown

1.  Create a http web server in the language of your choice
2.  Create a docker image which contains your server
3.  Create the Kubernetes deployment configuration
4.  Deploy your server to abakus.spacemaker.ai

If you complete all of these steps, then each of the first three includes extra
optional steps. These do not build upon each other and you can pick the ones that
interests you.

#### Creating a web server

- a) Pick a language (and framework) to implement the web server.

- b) Write a simple web server which accepts a GET request on the root path ('/').
  Make the web server respond with a JSON response to the request with the
  following payload:

```
[
  {
    x: 5,
    y: 5,
    dx: 10,
    dy: 20,
    dz: 6
  },
  {
    x: 40,
    y: 5,
    dx: 10,
    dy: 20,
    dz: 6
  }
]
```

This means create two 20x10 meters building with a height of 6 meters. place
the first building 5 meters from the top and left edges and the second 40 meters
from the top.

You can test your server using `$ curl localhost:8080`, assuming that your server
runs on port 8080. It should reply with the JSON structure above.

- (optional) d) Place the buildings in a fixed, but personalized layout.

- (optional) e) Write an algorithm for optimizing the placement of the buildings.
  You can look at the readme of the [`analysis-service`](../platform-services/analysis-service)
  for the rules which you solution is evaluated based on. Try to optimize for
  these criteria.

(there is a small prize for the _best_ solution)

#### Create a docker image for you server.

The steps here are generally the steps needed to create a docker image. For
your language there can be more or less steps needed. A simple google search
can on `docker <language> <framework>` will usually help. These steps should
be done in the [Dockerfile](./Dockerfile).

- a) Add a base image to your `Dockerfile` (`FROM <image-name>:<tag>`)
  (You will often need to set up additional build dependencies) (e.g `RUN apt-get install <...>`)

- b) Copy the source code from you project folder into the image (`COPY <path on host> <path on image>`)

- c) Run the build command for your language (e.g. `RUN npm install`)

- d) Add the command which starts your server (e.g. `CMD ["node", "index.js"]`)

- e) Build your service with `docker build . -t <your-docker-image-name>`
  Run it with `docker run -it -d -p <port> <your-docker-image-name>`

You can now test your server with the same `curl localhost:<port>` command.

- (optional) f) Reduce the size of the resulting docker images as much as possible.
  You can find the size of your image with the `docker images` command.
  Hint: docker supports layered builds, where you first set up a `build` image
  which produces a binary file, this file is then copied to a `run` image
  which is capable of running the binary, but much smaller than `build` image.
  See [validation-service](../platform-services/validation-service/Dockerfile)
  and [services-service](../platform-services/services-service/Dockerfile) for examples.

(there is a small prize for the smallest working image)

- (optional) g) Make your Docker build run the minimal number of step for each
  subsequent builds. Your local installation of Docker includes a cache which it
  will use to reduce the number of operations it will do.
  Examples of typical reductions includes:

Avoid reinstall platform build dependencies on each build

Avoid reinstall code dependencies when only code has changed.

#### Create the Kubernetes deployment configuration

These steps should be done in [service.yml](./service.yml)

- a) Pick a `path` for your application. It will be mounted on
  abakus.spacemaker.ai/<your-path>

- b) Add a Deployment `kind: Deployment`

- c) Add a Service `kind: Service`

- d) Add an Ingress `kind: Ingress`

- (optional) e) Configure the resource utilization appropriate for your langauge.

#### Deploy the service to Kubernetes

- a) Tag your docker image. `docker tag <image-name> <username>/<image-name>`

- b) Push your docker image to Dockerhub. `docker push <username>/<image-name>`

- c) Deploy the service to Kubernetes `kubectl apply -f service.yml`

You should now be able to see your solution on http://abakus.spacemaker.ai
You can look at it alone on http://abakus.spacmaker.ai/#/<your-path>
