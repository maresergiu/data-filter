<template>
  <div class="text-center">
    <ul v-if="pages.length > 1" class="pagination cf inline-bl">
      <li class="pagination-element float-left">
        <button
          type="button"
          class="cta cta-smp"
          :class="{ 'disabled': activePage === 1 }"
          @click="handleClickCta(1)"
        >first page</button>
      </li>
      <li
        v-for="page in pages"
        :key="`key-${page}`"
        class="pagination-element float-left"
        :class="{ active: activePage === page }"
      >
        <button
          v-if="activePage -1 === page || activePage === page || activePage + 1 === page"
          type="button"
          class="cta cta-smp"
          @click="handleClickCta(page)"
        >{{ page }}</button>
      </li>
      <li class="pagination-element float-left">
        <button
          type="button"
          class="cta cta-smp"
          :class="{ 'disabled': activePage === pages[pages.length - 1] }"
          @click="handleClickCta(pages[pages.length - 1])"
        >last page</button>
      </li>
    </ul>
  </div>
</template>

<script>
import "../scss/components/pagination.scss";

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
