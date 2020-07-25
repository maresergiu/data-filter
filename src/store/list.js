const namespaced = true;

const state = {
  peopleList: [],
  peopleFilteredList: []
};

const mutations = {
  SET_PEOPLE_LIST: (state, peopleList) => {
    state.peopleList = peopleList;
  },
  SET_PEOPLE_FILTERED_LIST: (state, peopleFilteredList) => {
    state.peopleFilteredList = peopleFilteredList;
  }
};

const actions = {
  setPeopleList: ({ commit }, peopleList) => {
    commit("SET_PEOPLE_LIST", peopleList);
  },
  setPeopleFilteredList: ({ commit }, peopleFilteredList) => {
    commit("SET_PEOPLE_FILTERED_LIST", peopleFilteredList);
  }
};

const getters = {
  getPeopleList: state => state.peopleList,
  getPeopleFilteredList: state => state.peopleFilteredList
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
