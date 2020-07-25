<template>
  <div>
    <Loader />
  </div>
</template>

<script>
import Loader from "./Loader.vue";

// this component holds all the global component that are present on the page, asa loaders, dialog boxes etc

export default {
  name: "GlobalComponents",
  components: {
    Loader
  }
};
</script>
