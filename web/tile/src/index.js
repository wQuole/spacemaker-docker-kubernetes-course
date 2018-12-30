import * as services from "./services/services";
import * as local from "./services/local";

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
  const service = window.localmode ? local : services;

  for (let { name, app } of await service.getAllServices()) {
    try {
      const block = await service.getServiceResult(app);

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

function setLocalMessage(isLocal) {
  if (isLocal) {
    const div = document.getElementById("local-service");
    div.style.visibility = "visible";
  }
}

run(state.getTiles());
callService();
updateHash();
setLocalMessage(window.localmode);
