<template>
  <li class="list-element" :class="{ active: listElem._id === activeListElem }">
    <div class="cf">
      <h3 class="sub-title sub-title-xs float-left">{{ listElem.name }}</h3>
      <button
        type="button"
        class="cta cta-smp float-right icon"
        :class="{ active: listElem._id === activeListElem }"
        @click="() => handleClickCta(listElem._id)"
      >
        <img src="@/assets/down-arrow.png" alt="icon" />
      </button>
    </div>
    <slide-up-down
      :active="listElem._id === activeListElem"
      :duration="animTimers.fast"
    >
      <ul class="holder">
        <li>
          <p>Genrder: {{ listElem.gender }}</p>
        </li>
        <li>
          <p>Age: {{ listElem.age }}</p>
        </li>
        <li>
          <p>EyeColor: {{ listElem.eyeColor }}</p>
        </li>
        <li>
          <p>Prefered pet: {{ listElem.preferences.pet }}</p>
        </li>
        <li>
          <p>Prefered fruit: {{ listElem.preferences.fruit }}</p>
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
