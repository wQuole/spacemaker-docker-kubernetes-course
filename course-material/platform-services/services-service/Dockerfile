
# build
FROM node:8-alpine as build-core
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn
COPY src . 
RUN yarn build

# node
FROM node:8-alpine
ARG RELEASE
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build-core /app .
ENTRYPOINT ["node", "dist/index.js"]
