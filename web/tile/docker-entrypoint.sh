#!/bin/bash
set -e

# This script is executed when running `docker run ...` just before the CMD in
# the docker file. It checks for the LOCAL_MODE enviroment variable and sets up
# a nginx configuration with a proxy to the docker host if the variable is true.

LOCAL_PORT=${LOCAL_PORT:-3000} # Set local port enviroment variable default value

if [ $LOCAL_MODE ]; then
  echo "Setting up local service at port $LOCAL_PORT"
  LOCAL_PORT=$LOCAL_PORT envsubst '${LOCAL_PORT}' < /etc/nginx/conf.d/nginx.local.conf.template > /etc/nginx/conf.d/nginx.conf
fi

exec "$@"
