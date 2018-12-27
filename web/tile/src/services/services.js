const endpoints = {
  all: "/services",
  proxy: "/services/"
};

function fetchMock() {
  return Promise.resolve([
    { x: 0, y: 0, dx: 20, dy: 20, dz: 20 },
    { x: 80, y: 0, dx: 20, dy: 20, dz: 20 },
    { x: 0, y: 30, dx: 20, dy: 20, dz: 20 },
    { x: 80, y: 30, dx: 20, dy: 20, dz: 20 }
  ]);
}

function fetchService(name) {
  const url = "/" + name;
  return fetch(url).then(r => r.json());
}

export async function getAllServices() {
  return fetch(endpoints.all).then(r => r.json());
}

export async function getServiceResult(app) {
  return fetch(endpoints.proxy + app).then(r => r.json());
}
