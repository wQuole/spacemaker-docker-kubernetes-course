const el = document.getElementById("failed");
const sortedEntries = tiles =>
  Object.entries(tiles).sort(([a], [b]) => a.localeCompare(b));
const css = o =>
  'style="' +
  Object.entries(o)
    .map(([key, value]) => `${key}:${value}`)
    .join(";") +
  '"';

const style = {
  "white-space": "nowrap",
  overflow: "hidden",
  "text-overflow": "ellipsis"
};

const styleBox = color => ({
  width: "10px",
  height: "10px",
  display: "inline-block",
  "background-color": color
});

function renderInvalid([
  name,
  {
    validation: { errorMessage },
    color
  }
]) {
  return `<li><div ${css(styleBox(color))}> </div> ${name}: <br> <span ${css(
    style
  )}>${errorMessage}</span></li>`;
}

function renderError([name, { error, color }]) {
  return `<li><div ${css(styleBox(color))}> </div> ${name}: <br> <span ${css(
    style
  )}>${error}</span></li>`;
}

export function render(invalids, errors) {
  el.innerHTML = `
    <span>Invalid:</span>
    <ul>
      ${sortedEntries(invalids)
        .map(renderInvalid)
        .join("")}
    </ul>
    <span>Error:</span>
    <ul>
      ${sortedEntries(errors)
        .map(renderError)
        .join("")}
    </ul>
  `;
}
