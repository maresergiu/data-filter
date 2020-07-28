<template>
  <div>
    <Loader />
  </div>
</template>

<script>
import Loader from "./Loader.vue";

// this component holds all the global components that are present on the page
export default {
  name: "GlobalComponents",
  components: {
    Loader
  }
};
</script>
