<template>
  <ul v-if="pages.length > 1" class="pagination cf">
    <li
      v-for="page in pages"
      :key="`key-${page}`"
      class="pagination-element float-left"
      :class="{ active: activePage === page }"
    >
      <button type="button" class="cta-smp" @click="handleClickCta(page)">{{ page }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pages: {
      type: Array,
      required: true,
      default: () => []
    },
    activePage: {
      type: Number,
      require: true,
      default: 0
    }
  },
  methods: {
    handleClickCta(page) {
      this.$emit("emittedActivePage", page);
    }
  }
};
</script>
