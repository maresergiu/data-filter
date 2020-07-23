<template>
  <div class="loader" :class="{ active: getLoaderVisibility }">
    <div class="loader-circle"></div>
    <div class="loader-circle"></div>
  </div>
</template>

<script>
import "../scss/components/loader.scss";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("loader", ["getLoaderVisibility"])
  }
};
</script>
