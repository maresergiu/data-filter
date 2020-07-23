const namespaced = true;

const state = {
  filters: {}
};

const mutations = {
  SET_FILTERS: (state, filters) => {
    state.filters = filters;
  },
  SET_RESET_FILTERS: state => {
    state.filters = {};
  }
};

const actions = {
  setFilters: ({ commit }, filters) => {
    commit("SET_FILTERS", filters);
  },
  setResetFilters: ({ commit }) => {
    commit("SET_RESET_FILTERS");
  }
};

const getters = {
  getFilters: state => state.filters
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
