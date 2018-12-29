import { getAllServices, getServiceResult } from "./services/services";
import { validate, isValid } from "./services/validation";
import { analyse } from "./services/analysis";
import { run, update as update3D } from "./render";
import { render as renderError } from "./views/errors";
import { render as renderScore } from "./views/score";
import { state, apply } from "./store";

function updateHash() {
  const { hash } = document.location;

  const name = hash.replace(/#?\/?/, "");

  if (name) {
    apply({ type: "filter/set", name });
  } else {
    apply({ type: "filter/clear" });
  }
  update();
}

function update() {
  update3D(state.getTiles());
  renderScore(state.getAnalysis());
  renderError(state.getInvalids(), state.getErrors());
}

window.addEventListener("hashchange", updateHash, false);

async function callService() {
  const services = await getAllServices();

  for (let { name, app } of services) {
    try {
      const block = await getServiceResult(app);

      const validation = await validate(block);
      if (isValid(validation)) {
        apply({ type: "result", name, block });
        const score = await analyse(block);
        apply({ type: "analyse", name, score });
      } else {
        apply({ type: "invalid", name, validation });
      }
    } catch (error) {
      apply({ type: "error", name, error });
    }
  }

  update();
  setTimeout(callService, 1000);
}

run(state.getTiles());
callService();
updateHash();
