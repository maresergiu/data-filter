<template>
  <li
    class="list-element"
    :class="{ active: listElem._id === activeListElem }"
    data-test-scope="list-element"
  >
    <div class="cf">
      <h3
        class="sub-title sub-title-xs float-left"
        data-test-scope="list-element-name"
      >
        {{ listElem.name }}
      </h3>
      <button
        type="button"
        class="cta cta-smp float-right icon"
        data-test-scope="list-element-dropd-down-cta"
        :class="{ active: listElem._id === activeListElem }"
        @click="() => handleClickCta(listElem._id)"
      >
        <img src="@/assets/down-arrow.png" alt="icon" />
      </button>
    </div>
    <slide-up-down
      :active="listElem._id === activeListElem"
      :duration="animTimers.fast"
      data-test-scope="list-element-details"
    >
      <ul class="holder">
        <li>
          <p>
            Genrder:
            <span data-test-scope="list-element-gender">{{
              listElem.gender
            }}</span>
          </p>
        </li>
        <li>
          <p>
            Age:
            <span data-test-scope="list-element-age">{{ listElem.age }}</span>
          </p>
        </li>
        <li>
          <p>
            EyeColor:
            <span data-test-scope="list-element-eye-color">{{
              listElem.eyeColor
            }}</span>
          </p>
        </li>
        <li>
          <p>
            Prefered pet:
            <span data-test-scope="list-element-pet">{{
              listElem.preferences.pet
            }}</span>
          </p>
        </li>
        <li>
          <p>
            Prefered fruit:
            <span data-test-scope="list-element-fruit">{{
              listElem.preferences.fruit
            }}</span>
          </p>
        </li>
      </ul>
    </slide-up-down>
  </li>
</template>

<script>
import "../scss/components/list.scss";

import SlideUpDown from "vue-slide-up-down";
import helpers from "../helpers/jsData";

export default {
  name: "List",
  props: {
    listElem: {
      type: Object,
      required: true
    },
    activeListElem: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      toggleVisibility: false,
      animTimers: helpers.timers,
      clickTimer: {}
    };
  },
  components: {
    SlideUpDown
  },
  methods: {
    handleClickCta(id) {
      clearTimeout(this.clickTimer);

      this.clickTimer = setTimeout(() => {
        this.$emit(
          "emittedActiveListElem",
          this.activeListElem === id ? "-1" : id
        );
      }, this.animTimers.fast);
    }
  }
};
</script>
