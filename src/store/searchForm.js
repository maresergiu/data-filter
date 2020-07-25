const namespaced = true;

const state = {
  filters: {},
  triggerFiltering: 0,
  genderRadioBoxObj: [],
  eyeCheckBoxObj: [],
  petCheckBoxObj: [],
  fruitCheckBoxObj: [],
  yearSliderObj: [],
  resetFiltering: 0
};

const mutations = {
  SET_FILTERS: (state, filters) => {
    state.filters = filters;
  },
  SET_RESET_FILTERS: state => {
    state.filters = {};
    state.resetFiltering += 1;
  },
  SET_TRIGGER_FILTERING: (state, triggerFiltering) => {
    state.triggerFiltering = triggerFiltering;
  },
  SET_GENDER_RADIO_BOX_OBJ: (state, genderRadioBoxObj) => {
    state.genderRadioBoxObj = genderRadioBoxObj;
  },
  SET_EYE_CHECK_BOX_OBJ: (state, eyeCheckBoxObj) => {
    state.eyeCheckBoxObj = eyeCheckBoxObj;
  },
  SET_PET_CHECK_BOX_OBJ: (state, petCheckBoxObj) => {
    state.petCheckBoxObj = petCheckBoxObj;
  },
  SET_FRUIT_CHECK_BOX_OBJ: (state, fruitCheckBoxObj) => {
    state.fruitCheckBoxObj = fruitCheckBoxObj;
  },
  SET_YEAR_SLIDER_OBJ: (state, yearSliderObj) => {
    state.yearSliderObj = yearSliderObj;
  }
};

const actions = {
  setFilters: ({ commit }, filters) => {
    commit("SET_FILTERS", filters);
  },
  setResetFilters: ({ commit }) => {
    commit("SET_RESET_FILTERS");
  },
  setTriggerFiltering: ({ commit }, triggerFiltering) => {
    commit("SET_TRIGGER_FILTERING", triggerFiltering);
  },
  setGenderRadioBoxObj: ({ commit }, genderRadioBoxObj) => {
    commit("SET_GENDER_RADIO_BOX_OBJ", genderRadioBoxObj);
  },
  setEyeCheckBoxObj: ({ commit }, eyeCheckBoxObj) => {
    commit("SET_EYE_CHECK_BOX_OBJ", eyeCheckBoxObj);
  },
  setPetCheckBoxObj: ({ commit }, petCheckBoxObj) => {
    commit("SET_PET_CHECK_BOX_OBJ", petCheckBoxObj);
  },
  setFruitCheckBoxObj: ({ commit }, fruitCheckBoxObj) => {
    commit("SET_FRUIT_CHECK_BOX_OBJ", fruitCheckBoxObj);
  },
  setYearSliderObj: ({ commit }, yearSliderObj) => {
    commit("SET_YEAR_SLIDER_OBJ", yearSliderObj);
  }
};

const getters = {
  getFilters: state => state.filters,
  getTriggerFiltering: state => state.triggerFiltering,
  getGenderRadioBoxObj: state => state.genderRadioBoxObj,
  getEyeCheckBoxObj: state => state.eyeCheckBoxObj,
  getPetCheckBoxObj: state => state.petCheckBoxObj,
  getFruitCheckBoxObj: state => state.fruitCheckBoxObj,
  getYearSliderObj: state => state.yearSliderObj,
  getResetFiltering: state => state.resetFiltering
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
