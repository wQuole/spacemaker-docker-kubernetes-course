# Spacemaker Python example

Example spacemaker service, written in Python with the
[Tornado](http://www.tornadoweb.org/en/latest/) web framework.

## Usage

### `GET /`

Returns a list of buildings in the following format:

```json
[
  { "x": 0, "y": 0, "dx": 20, "dy": 20, "dz": 20 },
  { "x": 40, "y": 40, "dx": 20, "dy": 20, "dz": 40 }
]
```

## Hacking

Install dependencies with

```bash
$ pipenv install
```

Run the server with the following command:

```bash
$ pipenv run dev-server
```

Server now running on `http://localhost:8888/`.
