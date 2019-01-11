FROM python:3.7

# Install pipenv
RUN pip install pipenv

RUN mkdir /app
WORKDIR /app
COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

# Install all required packages for the service
RUN pipenv install pip && pipenv install

COPY server.py server.py
COPY analysis.py analysis.py
COPY worker.py worker.py
COPY utils utils

# Port 8888 is used within the docker container
EXPOSE 8888

# Use pipenv to run the server
ENTRYPOINT [ "pipenv", "run", "server" ]