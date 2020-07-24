<template>
  <div class="mod">
    <p>The following list has {{ countList }} elements.</p>
    <h2 class="sub-title sub-title-sm">List</h2>
    <ul class="list">
      <ListElement
        v-for="listElem in list"
        :key="listElem._id"
        :listElem="listElem"
        :activeListElem="activeListElem"
        @emittedActiveListElem="setActiveListElem"
      />
    </ul>
  </div>
</template>

<script>
import "../scss/components/list.scss";

import ListElement from "./ListElement.vue";

export default {
  name: "List",
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      activeListElem: "-1"
    };
  },
  components: {
    ListElement
  },
  computed: {
    countList() {
      return this.list.length;
    }
  },
  methods: {
    setActiveListElem(id) {
      this.activeListElem = id;
    }
  }
};
</script>
