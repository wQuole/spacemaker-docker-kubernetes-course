export async function getAllServices() {
  return [{ name: "local", app: "local" }];
}

export async function getServiceResult(app) {
  return fetch("/service").then(r => r.json());
}
