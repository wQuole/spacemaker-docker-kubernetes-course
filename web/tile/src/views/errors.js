const el = document.getElementById("failed");

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
      ${Object.entries(invalids)
        .map(renderInvalid)
        .join("")}
    </ul>
    <span>Error:</span>
    <ul>
      ${Object.entries(errors)
        .map(renderError)
        .join("")}
    </ul>
  `;
}
