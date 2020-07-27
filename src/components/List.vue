<template>
  <div class="mod">
    <p class="text" data-test-scope="list-count">The following list has {{ countList }} elements.</p>
    <h2 class="sub-title sub-title-sm">List</h2>
    <ul class="list" data-test-scope="list">
      <ListElement
        v-for="listElem in listToBeDisplayed"
        :key="listElem._id"
        :listElem="listElem"
        :activeListElem="activeListElem"
        @emittedActiveListElem="setActiveListElem"
      />
    </ul>
    <Pagination
      v-if="enablePagination"
      :pages="paginationTotalPagesArray"
      :activePage="paginationActivePage"
      @emittedActivePage="setActivePage"
    />
  </div>
</template>

<script>
import "../scss/components/list.scss";

import paginationParent from "../helpers/paginationParent.js";

import ListElement from "./ListElement.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "List",
  props: {
    list: {
      // array of object
      type: Array,
      required: false,
      default: () => []
    },
    enablePagination: {
      // triggers the pagination UI and functionality
      // this module can be displayed olso as a simple list
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      activeListElem: "-1",
      paginationListArray: this.list,
      listToBeDisplayed: [] // the array that will bild the list component
    };
  },
  // extra functionality to cater for pagination if triggered
  mixins: [paginationParent("paginationListArray", "enablePagination")],
  components: {
    ListElement,
    Pagination
  },
  computed: {
    countList() {
      return this.listToBeDisplayed.length;
    }
  },
  watch: {
    paginatedList() {
      this.selectLisToBeDisplayed();
    },
    list() {
      this.activeListElem = "-1";

      if (!this.enablePagination) this.selectLisToBeDisplayed();
    }
  },
  methods: {
    setActiveListElem(id) {
      this.activeListElem = id;
    },
    selectLisToBeDisplayed() {
      // paginatedList is a propperty that is inherited from the paginationParent mixin
      this.listToBeDisplayed = this.enablePagination
        ? this.paginatedList
        : this.list;
    }
  },
  mounted() {
    this.selectLisToBeDisplayed();
  }
};
</script>
