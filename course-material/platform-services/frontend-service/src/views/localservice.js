import { getLocalServiceMessage } from "../store";

const el = document.getElementById("modal");

export function render(message) {
  if (message) {
    el.style.visibility = "visible";
    el.innerHTML = `
    <div class="modal">
      <h2>${message}</h2>
    </div>
  `;
  } else {
    el.style.visibility = "hidden";
    el.innerHTML = "";
  }
}
