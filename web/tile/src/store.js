export const state = {
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

export function apply(change) {
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
