export async function validate(block) {
  return {
    isValid: Math.random() > 0.5, //true,
    validationResults: [{}, {}, {}]
  };

  const response = await fetch("/validation-service", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(block)
  });

  return response.json();
}

export function isValid(validationResult) {
  return validationResult.isValid;
}
