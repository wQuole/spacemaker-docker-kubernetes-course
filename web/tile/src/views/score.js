const el = document.getElementById("score");

const sortedEntriesByScore = scores =>
  Object.entries(scores).sort((a, b) => b[1] - a[1]);

function renderBlock([name, score]) {
  return `<li>${name} - ${score}</li>`;
}

export function render(scores) {
  el.innerHTML = `
    <span>Score:</span>
    <ul>
      ${sortedEntriesByScore(scores)
        .map(renderBlock)
        .join(" ")}
    </ul>
  `;
}
