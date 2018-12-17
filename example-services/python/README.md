# Hello world Python example

"Hello world" example application, written in Python with the
[Tornado](http://www.tornadoweb.org/en/latest/) web framework.

## Usage

### `POST hello/`

Example input:

```json
{
  "name": "Håkon"
}
```

Response:

```json
{
  "greeting": "Hello, Håkon!"
}
```

## Hacking

Run the server with the following command:

```bash
$ pipenv run dev-server
```

Server now running on `http://localhost:8888/`.
