import { getAllServices, getServiceResult } from "./services/services";
import { validate, isValid } from "./services/validation";
import { analyse } from "./services/analysis";
import { run, update } from "./render";
import { render as renderError } from "./views/errors";
import { render as renderScore } from "./views/score";

const state = {
  tiles: {},
  analysis: {},
  invalids: {},
  errors: {}
};

function apply(change) {
  switch (change.type) {
    case "result": {
      const { name, block } = change;
      delete state.analysis[name];
      delete state.invalids[name];
      delete state.errors[name];
      state.tiles[name] = block;
      break;
    }

    case "analyse": {
      const { name, score } = change;
      delete state.invalids[name];
      delete state.errors[name];
      state.analysis[name] = score;
      break;
    }

    case "invalid": {
      const { name, validation } = change;
      delete state.analysis[name];
      delete state.tiles[name];
      delete state.errors[name];
      state.invalids[name] = validation;
      break;
    }

    case "error": {
      const { name, error } = change;
      delete state.analysis[name];
      delete state.tiles[name];
      delete state.invalids[name];
      state.errors[name] = error;
      break;
    }
  }
}

run(state.tiles);

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
    } catch (e) {
      apply({ type: "error", name, e });
    }
  }

  update(state.tiles);
  renderScore(state.analysis);
  renderError(state.invalids, state.errors);
  setTimeout(callService, 5000);
  console.log(state);
}
callService();
