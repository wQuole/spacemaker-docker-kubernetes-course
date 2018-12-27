import { getAllServices, getServiceResult } from "./services/services";
import { validate, isValid } from "./services/validation";
import { analyse } from "./services/analysis";
import { run, update as update3D } from "./render";
import { render as renderError } from "./views/errors";
import { render as renderScore } from "./views/score";

const state = {
  filter: null,
  tiles: {},
  analysis: {},
  invalids: {},
  errors: {},

  getTiles() {
    return this.filterObject(this.tiles);
  },

  getAnalysis() {
    return this.filterObject(this.analysis);
  },

  getInvalids() {
    return this.filterObject(this.invalids);
  },

  getErrors() {
    return this.filterObject(this.errors);
  },

  filterObject(object) {
    if (this.filter) {
      return Object.entries(object)
        .filter(([name]) => name === this.filter)
        .reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {});
    } else {
      return object;
    }
  }
};

function apply(change) {
  switch (change.type) {
    case "filter/set": {
      const { name } = change;
      state.filter = name;
      break;
    }
    case "filter/clear": {
      state.filter = null;
      break;
    }

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
    } catch (e) {
      apply({ type: "error", name, e });
    }
  }

  update();
  setTimeout(callService, 5000);
}
callService();
updateHash();
