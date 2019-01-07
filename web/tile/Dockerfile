# Set up build stage with node
FROM node:9.11.1 as build

# Set up a directory to build in
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy only package.json first performance
# Avoids running install step if code changes and dependencies are unchanged. 
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

# Build the frontend
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build

# Set up the production stage
FROM nginx:1.13.12-alpine

# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Set up nginx configuration files
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Set up the nginx local development configuration
COPY nginx/nginx.local.conf.template /etc/nginx/conf.d/nginx.local.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

# Start command to run nginx
CMD ["nginx", "-g", "daemon off;"]
