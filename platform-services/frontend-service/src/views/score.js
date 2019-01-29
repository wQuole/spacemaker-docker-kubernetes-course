const el = document.getElementById("score");

const style = color => ({
  width: "10px",
  height: "10px",
  display: "inline-block",
  "background-color": color
});

const css = o =>
  'style="' +
  Object.entries(o)
    .map(([key, value]) => `${key}:${value}`)
    .join(";") +
  '"';

const sortedEntriesByScore = scores =>
  Object.entries(scores).sort((a, b) => b[1].score - a[1].score);

function renderBlock([name, { score, color }]) {
  return `<li><div ${css(style(color))}> </div> ${name} - ${score}</li>`;
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
