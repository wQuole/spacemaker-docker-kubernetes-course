function fetchMock() {
  return Promise.resolve([
    { x: 0, y: 0, width: 20, depth: 20, height: 20 },
    { x: 80, y: 0, width: 20, depth: 20, height: 20 },
    { x: 0, y: 30, width: 20, depth: 20, height: 20 },
    { x: 80, y: 30, width: 20, depth: 20, height: 20 }
  ]);
}

function fetchService() {
  return fetch("/api").then(r => r.json());
}

export function service() {
  return Promise.all([fetchService(), fetchService()]);
}
