function fetchMock() {
  return Promise.resolve([
    { x: 0, y: 0, dx: 20, dy: 20, dz: 20 },
    { x: 80, y: 0, dx: 20, dy: 20, dz: 20 },
    { x: 0, y: 30, dx: 20, dy: 20, dz: 20 },
    { x: 80, y: 30, dx: 20, dy: 20, dz: 20 }
  ]);
}

function fetchService(name) {
  let url = "/api";
  if (name) {
    url += "/" + name;
  }

  console.log(url);

  return fetch(url).then(r => r.json());
}

export function service() {
  return Promise.all([fetchService("local"), fetchService("service")]);
}
