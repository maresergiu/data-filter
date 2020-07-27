<template>
  <div class="text-center" data-test-scope="pagination">
    <!-- display the pagination component only if we have more then one page -->
    <ul v-if="pages.length > 1" class="pagination cf inline-bl">
      <li class="pagination-element float-left" data-test-scope="pagination-element-first">
        <button
          type="button"
          class="cta cta-smp"
          :class="{ disabled: activePage === 1 }"
          @click="handleClickCta(1)"
        >first</button>
      </li>
      <li
        v-for="page in pages"
        :key="`key-${page}`"
        class="pagination-element float-left"
        :data-test-scope="`pagination-element-${page}`"
        :class="{ active: activePage === page }"
      >
        <button
          v-if="checkPageVisibility(page)"
          type="button"
          class="cta cta-smp"
          @click="handleClickCta(page)"
        >{{ page }}</button>
      </li>
      <li class="pagination-element float-left" data-test-scope="pagination-element-last">
        <button
          type="button"
          class="cta cta-smp"
          :class="{ disabled: activePage === pages[pages.length - 1] }"
          @click="handleClickCta(pages[pages.length - 1])"
        >last</button>
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
      // holds the pages that will be rendered
      type: Array,
      required: true,
      default: () => []
    },
    activePage: {
      // holdes the active selected page by the user
      type: Number,
      require: true,
      default: 1
    }
  },
  methods: {
    checkPageVisibility(page) {
      return (
        this.pages.length < 2 ||
        this.activePage - 1 === page ||
        this.activePage === page ||
        this.activePage + 1 === page
      );
    },
    handleClickCta(page) {
      this.$emit("emittedActivePage", page);
    }
  }
};
</script>
