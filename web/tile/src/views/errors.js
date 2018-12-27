const el = document.getElementById("failed");

function renderBlock([name, error]) {
  return `<li>${name}</li>`;
}

export function render(invalids, errors) {
  el.innerHTML = `
    <span>Failed:</span>
    <ul>
      ${Object.entries(invalids)
        .map(renderBlock)
        .join("")}
      ${Object.entries(errors)
        .map(renderBlock)
        .join("")}
    </ul>
  `;
}
