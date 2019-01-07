export async function analyse(block) {
  return JSON.stringify(block).length;
  /*
  const response = await fetch("/analysis-service", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(block)
  });

  return response.json();
  */
}
