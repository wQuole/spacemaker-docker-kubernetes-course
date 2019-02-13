FROM python:3.7

COPY . /

EXPOSE 8888

RUN pip install pipenv
RUN pipenv install


ENTRYPOINT ["pipenv", "run", "dev-server"]

