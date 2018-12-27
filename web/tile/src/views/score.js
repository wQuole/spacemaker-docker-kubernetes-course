const el = document.getElementById("score");

function renderBlock([name, score]) {
  return `<li>${name} - ${score}</li>`;
}

export function render(scores) {
  el.innerHTML = `
    <span>Score:</span>
    <ul>
      ${Object.entries(scores)
        .map(renderBlock)
        .join(" ")}
    </ul>
  `;
}
