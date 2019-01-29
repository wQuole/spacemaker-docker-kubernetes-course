const endpoints = {
  all: "/services",
  proxy: "/services/"
};

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
