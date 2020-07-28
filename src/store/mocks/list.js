export default {
  namespaced: true,
  state: {
    peopleList: [],
    peopleFilteredList: []
  },
  mutations: {
    SET_PEOPLE_LIST: jest.fn(),
    SET_PEOPLE_FILTERED_LIST: jest.fn()
  },
  actions: {
    setPeopleList: jest.fn(),
    setPeopleFilteredList: jest.fn()
  },
  getters: {
    getPeopleList: state => state.peopleList,
    getPeopleFilteredList: state => state.peopleFilteredList
  }
};
