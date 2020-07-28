export default {
  namespaced: true,
  state: {
    filters: {},
    triggerFiltering: 0,
    genderRadioBoxObj: [
      { id: "gender-male", value: "male", label: "male" },
      { id: "gender-female", value: "female", label: "female" }
    ],
    eyeCheckBoxObj: [
      { id: "eyeColor-brown", value: "brown", label: "brown" },
      { id: "eyeColor-blue", value: "blue", label: "blue" },
      { id: "eyeColor-green", value: "green", label: "green" }
    ],
    petCheckBoxObj: [
      { id: "preferences-pet-bird", value: "bird", label: "bird" },
      { id: "preferences-pet-cat", value: "cat", label: "cat" },
      { id: "preferences-pet-none", value: "none", label: "none" },
      { id: "preferences-pet-dog", value: "dog", label: "dog" }
    ],
    fruitCheckBoxObj: [
      { id: "preferences-pet-apple", value: "apple", label: "apple" },
      {
        id: "preferences-pet-strawberry",
        value: "strawberry",
        label: "strawberry"
      },
      { id: "preferences-pet-banana", value: "banana", label: "banana" },
      { id: "preferences-pet-mango", value: "mango", label: "mango" }
    ],
    yearSliderObj: [20, 40],
    resetFiltering: 0
  },
  mutations: {
    SET_FILTERS: jest.fn(),
    SET_RESET_FILTERS: jest.fn(),
    SET_TRIGGER_FILTERING: jest.fn(),
    SET_GENDER_RADIO_BOX_OBJ: jest.fn(),
    SET_EYE_CHECK_BOX_OBJ: jest.fn(),
    SET_PET_CHECK_BOX_OBJ: jest.fn(),
    SET_FRUIT_CHECK_BOX_OBJ: jest.fn(),
    SET_YEAR_SLIDER_OBJ: jest.fn()
  },
  actions: {
    setFilters: jest.fn(),
    setResetFilters: jest.fn(),
    setTriggerFiltering: jest.fn(),
    setGenderRadioBoxObj: jest.fn(),
    setEyeCheckBoxObj: jest.fn(),
    setPetCheckBoxObj: jest.fn(),
    setFruitCheckBoxObj: jest.fn(),
    setYearSliderObj: jest.fn()
  },
  getters: {
    getFilters: state => state.filters,
    getTriggerFiltering: state => state.triggerFiltering,
    getGenderRadioBoxObj: state => state.genderRadioBoxObj,
    getEyeCheckBoxObj: state => state.eyeCheckBoxObj,
    getPetCheckBoxObj: state => state.petCheckBoxObj,
    getFruitCheckBoxObj: state => state.fruitCheckBoxObj,
    getYearSliderObj: state => state.yearSliderObj,
    getResetFiltering: state => state.resetFiltering
  }
};
