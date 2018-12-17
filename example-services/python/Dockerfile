FROM python:3.7-alpine

WORKDIR /app
COPY . .

# Install pipenv
RUN pip install pipenv

# Install all required packages for the service
RUN pipenv install

# Port 8888 is used within the docker container
EXPOSE 8888

# Use pipenv to run the server
ENTRYPOINT [ "pipenv", "run", "server" ]