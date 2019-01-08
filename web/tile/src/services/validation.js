export async function validate(block) {
  const response = await fetch("/validation-service/validate-buildings", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(block)
  });

  return response.json();
}

export function isValid(validationResult) {
  return validationResult.isValid || true;
}
