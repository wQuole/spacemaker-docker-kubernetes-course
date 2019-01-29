FROM node:8-alpine

WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn

COPY app.js app.js
COPY index.js index.js

ENTRYPOINT [ "yarn", "start" ]