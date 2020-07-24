<template>
  <div class="holder">
    <SearchForm />
    <div v-if="httpState === ''">
      <p class="text">Please bear with until we receive the data.</p>
    </div>
    <div v-else-if="httpState === 'success'">
      <List :list="getPeopleFilteredList" />
    </div>
    <div v-else-if="httpState === 'error'">
      <p class="text">
        <span>
          Something went wrong and we couldn't access the data.
        </span>
        <span v-if="internetConnectionState">
          Please check your internet connection.
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import filterData from "../helpers/filterData.js";

import List from "../components/List.vue";
import SearchForm from "../components/SearchForm.vue";

export default {
  name: "HomePage",
  components: {
    SearchForm,
    List
  },
  data() {
    return {
      httpState: "",
      internetConnectionState: false
    };
  },
  mixins: [filterData],
  computed: {
    ...mapGetters("list", ["getPeopleList", "getPeopleFilteredList"]),
    ...mapGetters("searchForm", [
      "getTriggerFiltering",
      "getFilters",
      "getResetFiltering"
    ])
  },
  watch: {
    getTriggerFiltering() {
      const filteredArray = this.filterArray(
        this.getPeopleList,
        this.getFilters
      );

      this.setPeopleFilteredList(filteredArray);
    },
    getPeopleList() {
      this.extractObjectKeyValues(this.getPeopleList);
    },
    getResetFiltering() {
      this.setPeopleFilteredList(this.getPeopleList);
    }
  },
  methods: {
    ...mapActions("loader", ["setLoaderVisibility"]),
    ...mapActions("list", ["setPeopleList", "setPeopleFilteredList"]),
    ...mapActions("searchForm", [
      "setGenderRadioBoxObj",
      "setEyeCheckBoxObj",
      "setPetCheckBoxObj",
      "setFruitCheckBoxObj",
      "setYearSliderObj"
    ]),
    setHttpState(value) {
      this.httpState = value;
    },
    setInternetConnectionState(value) {
      this.internetConnectionState = value;
    },
    extractObjectKeyValues(list) {
      const eyes = [],
        pet = [],
        fruit = [],
        peopleGender = [],
        yearSliderArray = [],
        eyesCheckBoxArray = [],
        petCheckBoxArray = [],
        fruitCheckBoxArray = [],
        peopleGenderRadioBoxArray = [];

      Array.isArray(list) &&
        list.length &&
        list.forEach(el => {
          const { eyeColor, preferences, age, gender } = el;

          if (eyeColor && eyes.indexOf(eyeColor) === -1) {
            eyes.push(eyeColor);
            eyesCheckBoxArray.push({
              id: `eyeColor-${eyeColor}`,
              value: eyeColor,
              label: eyeColor
            });
          }

          if (
            preferences &&
            preferences.pet &&
            pet.indexOf(preferences.pet) === -1
          ) {
            pet.push(preferences.pet);
            petCheckBoxArray.push({
              id: `preferences-pet-${preferences.pet}`,
              value: preferences.pet,
              label: preferences.pet
            });
          }

          if (
            preferences &&
            preferences.fruit &&
            fruit.indexOf(preferences.fruit) === -1
          ) {
            fruit.push(preferences.fruit);
            fruitCheckBoxArray.push({
              id: `preferences-pet-${preferences.fruit}`,
              value: preferences.fruit,
              label: preferences.fruit
            });
          }

          if (peopleGender && peopleGender.indexOf(gender) === -1) {
            peopleGender.push(gender);
            peopleGenderRadioBoxArray.push({
              id: `gender-${gender}`,
              value: gender,
              label: gender
            });
          }

          if (age && yearSliderArray.indexOf(age) === -1) {
            yearSliderArray.push(age);
          }
        });

      yearSliderArray.sort();

      this.setGenderRadioBoxObj(peopleGenderRadioBoxArray);
      this.setEyeCheckBoxObj(eyesCheckBoxArray);
      this.setPetCheckBoxObj(petCheckBoxArray);
      this.setFruitCheckBoxObj(fruitCheckBoxArray);
      this.setYearSliderObj([
        yearSliderArray[0],
        yearSliderArray[yearSliderArray.length - 1]
      ]);
    }
  },
  mounted() {
    this.setLoaderVisibility(true);

    axios
      .get(process.env.VUE_APP_PEOPLE_JSON_FILE, {
        baseURL: process.env.VUE_APP_BASE_URL
      })
      .then(response => {
        this.setPeopleList(response.data);
        this.setPeopleFilteredList(response.data);
        this.setHttpState("success");
      })
      .catch(() => {
        this.setHttpState("error");

        if (!navigator.onLine)
          this.setInternetConnectionState(navigator.onLine);
      })
      .then(() => {
        this.setLoaderVisibility(false);
      });
  }
};
</script>
