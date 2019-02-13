# Add the docker build here
FROM python:3.7

COPY server.py  server.py
COPY requirements.txt requirements.txt

EXPOSE 5000

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "server.py"]
