export const state = {
  filter: null,
  tiles: {},
  analysis: {},
  invalids: {},
  errors: {},
  localServiceMessage: null,

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

  getLocalServiceMessage(localmode) {
    if (this.localServiceMessage) {
      return this.localServiceMessage(localmode);
    }
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
    case "local-service/not-found": {
      state.localServiceMessage = ({ port }) =>
        `Could not find a service on http://localhost:${port}.`;
      break;
    }
    case "local-service/clear": {
      state.localServiceMessage = null;
      break;
    }

    case "result": {
      const { name, tile, color } = change;
      delete state.analysis[name];
      delete state.invalids[name];
      delete state.errors[name];
      state.tiles[name] = { tile, color };
      break;
    }

    case "analyse": {
      const { name, score, color } = change;
      delete state.invalids[name];
      delete state.errors[name];
      state.analysis[name] = { score, color };
      break;
    }

    case "invalid": {
      const { name, validation, color } = change;
      delete state.analysis[name];
      delete state.tiles[name];
      delete state.errors[name];
      state.invalids[name] = { validation, color };
      break;
    }

    case "error": {
      const { name, error, color } = change;
      delete state.analysis[name];
      delete state.tiles[name];
      delete state.invalids[name];
      state.errors[name] = { error, color };
      break;
    }
  }
}
