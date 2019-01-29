export async function getAllServices() {
  return [{ name: "local", app: "local" }];
}

export async function getServiceResult(app) {
  const response = await fetch("/service");
  if (response.status === 200) {
    return response.json();
  } else {
    throw response;
  }
}
