const namespaced = true;

const state = {
  loaderVisibility: false
};

const mutations = {
  SET_LOADER_VISIBILITY: (state, loaderVisibility) => {
    state.loaderVisibility = loaderVisibility;
  }
};

const actions = {
  setLoaderVisibility: ({ commit }, loaderVisibility) => {
    commit("SET_LOADER_VISIBILITY", loaderVisibility);
  }
};

const getters = {
  getLoaderVisibility: state => state.loaderVisibility
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
