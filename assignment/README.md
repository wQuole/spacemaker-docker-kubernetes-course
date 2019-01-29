# Spacemaker service template

This folder contains a template for the workshop assignment.
To solve the assignment, you should create and deploy your own service.
If you get stuck, you can look at the example services in [java](../example-services/java),
[javascript](../example-services/node), [python](../example-services/python-flask) and
[rust](../example-services/rust).

## Assignment

### Breakdown

1.  Pick the server code for the language of your choice
2.  Create a docker image which contains your server
3.  Create the Kubernetes deployment configuration
4.  Deploy your server to abakus.spacemaker.ai

#### Pick the web server

1. Pick a server from the [`assignment`](.) directory.

#### Create a docker image for your server.

The steps here are the most common steps needed to create a docker image.
(For some languages they are different)
These steps should be done in `Dockerfile` in your server directory.

1. Add a base image to your `Dockerfile` (`FROM <image-name>:<tag>`)
   (Sometimes you need to install additional dependencies) (e.g `RUN apt-get install <...>`)

2. Copy the source code from your project folder into the image (`COPY <path on host> <path on image>`)

3. Run the build command for your language (e.g. `RUN npm install`)

4. Add the command which starts your server (e.g. `ENTRYPOINT ["node", "index.js"]`)

5. Build your service with `docker build . -t <your-docker-image-name>`
   Run it with `docker run -p <host port>:<container port> <your-docker-image-name>`

You can now test your server with the `curl localhost:<port>` command.

You can see all running docker containers with `docker ps`. The first field in the result is
the container id. You can use this to get the stdout output of the server with
`docker logs <container-id>` and you can stop the container with
`docker stop <container-id>`. If you run `docker run ...` and `docker ps`
without your container showing up, then the docker container has crashed when
starting.

6. Tag your docker image. `docker tag <image-name> <username>/<image-name>`

7. Push your docker image to Dockerhub. `docker push <username>/<image-name>`

#### Create the Kubernetes deployment configuration

These steps should be done in `service.yml` in your server directory.

1. Pick a `path` for your application. It will be mounted on
   abakus.spacemaker.ai/<your-path>

2. Add a Deployment `kind: Deployment`

3. Add a Service `kind: Service`

4. Add an Ingress `kind: Ingress`

5. Deploy the service to Kubernetes `kubectl apply -f service.yml`

You should now be able to see your solution on http://abakus.spacemaker.ai
You can look at it alone on http://abakus.spacmaker.ai/#/<your-path>

#### Optional assignments

1. Update the server to place the buildings in a fixed, but personalized layout.

2. Write an algorithm for optimizing the placement of the buildings.
   You can look at the readme of the [`analysis-service`](../platform-services/analysis-service)
   for the rules which your solution is evaluated based on. Try to optimize for
   these criteria.

3. Reduce the size of the resulting docker image as much as possible. You can find the size of your image with the docker images command. Hint: docker supports layered builds, where you first set up a build image which produces a binary file, this file is then copied to a run image which is capable of running the binary. See validation-service and services-service for examples.

4) Make your Docker build run the minimal number of step for each subsequent builds. Your local installation of Docker includes a cache which it will use to reduce the number of operations it will do. Examples of typical reductions includes; avoid reinstall platform build dependencies on each build, avoid reinstall code dependencies when only code has changed.

5. Configure the resource utilization appropriate for your langauge in the `service.yml` file.
