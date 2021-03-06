# Prerequisites for the Spacemaker Docker Kubernetes course

Please follow the below instructions to install the required components for the
docker and kubernetes course.

## Docker

Docker is a full development platform for creating containerized apps.

### OSX

To install docker on OSX, follow these instructions:
[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/).

The installation might prompt you to create or log in to your DockerHub account.
You can do this now or do it later (see below).

### Windows

To install on Windows, follow these instructions:
[https://docs.docker.com/toolbox/toolbox_install_windows/](https://docs.docker.com/toolbox/toolbox_install_windows/)

The installation might prompt you to create or log in to your DockerHub account.
You can do this now or do it later (see below).

### Linux

To install on Linux, install the docker community edition, documented here:
[https://docs.docker.com/install/](https://docs.docker.com/install/). The
process is a little more tedious than on Windows and Mac.

For a Ubuntu specific
guide, see [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04).

## DockerHub

Go to https://hub.docker.com/ and create an account.

## Google Cloud SDK

Command-line interface for Google Cloud Platform products and services. Needed
to deploy services in the Kubernetes cluster.

### OSX

Install the SDK with homebrew:

```
$ brew cask install google-cloud-sdk
```

In case you don't have homebrew installed, instructions on how to install it are
found here: [https://cloud.google.com/sdk/docs/quickstart-macos](https://cloud.google.com/sdk/docs/quickstart-macos).
Skip the step where you're asked to create a GCP project. Also, there's no
need to initialize your SDK yet, we'll do that at the course.

### Windows

Instructions on how to install it are found here:
[https://cloud.google.com/sdk/docs/quickstart-windows](https://cloud.google.com/sdk/docs/quickstart-windows)
Skip the step where you're asked to create a GCP project. Also, there's no
need to initialize your SDK yet, we'll do that at the course.

### Linux

Instructions on how to install it are found here:
[https://cloud.google.com/sdk/docs/quickstart-linux](https://cloud.google.com/sdk/docs/quickstart-linux)
Skip the step where you're asked to create a GCP project. Also, there's no
need to initialize your SDK yet, we'll do that at the course.

There are also instructions for specific linux distributions available in the
documentation, including Ubuntu.

## Kubectl

Kubectl is the Kubernetes command line tool used to deploy and manage
applications on Kubernetes.

The easiest way to install kubectl is via the Google Cloud SDK. See instructions
at [https://kubernetes.io/docs/tasks/tools/install-kubectl/#download-as-part-of-the-google-cloud-sdk](https://kubernetes.io/docs/tasks/tools/install-kubectl/#download-as-part-of-the-google-cloud-sdk).

## Google Account

You need a Google account. If you have gmail, you have a Google account.

## Git

It is beneficial to have git installed, but strictly not needed.
