export default {
  namespaced: true,
  state: {
    loaderVisibility: false
  },
  mutations: {
    SET_LOADER_VISIBILITY: jest.fn()
  },
  actions: {
    setLoaderVisibility: jest.fn()
  },
  getters: {
    getLoaderVisibility: state => state.loaderVisibility
  }
};
