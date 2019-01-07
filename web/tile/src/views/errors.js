const el = document.getElementById("failed");
const sortedEntries = tiles =>
  Object.entries(tiles).sort(([a], [b]) => a.localeCompare(b));
const css = o =>
  Object.entries(o)
    .map(([key, value]) => `style="${key}:${value}"`)
    .join(";");

const style = {
  "white-space": "nowrap",
  overflow: "hidden",
  "text-overflow": "ellipsis"
};

function renderInvalid([name, { errorMessage }]) {
  return `<li>${name}: <br> <span ${css(style)}>${errorMessage}</span></li>`;
}

function renderError([name, error]) {
  return `<li>${name}: <br> <span ${css(style)}>${error}</span></li>`;
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
