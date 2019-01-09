export async function analyse(block) {
  const response = await fetch("/analysis-service", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(block)
  });

  const data = await response.json();

  if (data.body) {
    return Number.parseFloat(data.body);
  } else {
    return data;
  }
}
