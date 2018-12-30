#!/bin/bash
set -e

LOCAL_PORT=${LOCAL_PORT:-3000}

if [ $LOCAL_MODE ]; then
  echo "Setting up local service at port $LOCAL_PORT"
  LOCAL_PORT=$LOCAL_PORT envsubst '${LOCAL_PORT}' < /etc/nginx/conf.d/nginx.local.conf.template > /etc/nginx/conf.d/nginx.conf
fi

exec "$@"
