<template>
  <div class="holder">
    <SearchForm />
    <div v-if="httpState === ''">
      <p class="text">Please bear with until we receive the data.</p>
    </div>
    <div v-else-if="httpState === 'success'">
      <List :list="List" />
    </div>
    <div v-else-if="httpState === 'error'">
      <p class="text">
        <span>Something went wrong and we couldn't access the data.</span>
        <span v-if="internetConnectionState"
          >Please check your internet connection.</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

import List from "../components/List.vue";
import SearchForm from "../components/SearchForm.vue";

export default {
  name: "HomePage",
  components: {
    SearchForm,
    List
  },
  data() {
    return {
      httpState: "",
      List: [],
      internetConnectionState: false
    };
  },
  methods: {
    ...mapActions("loader", ["setLoaderVisibility"]),
    setList(list) {
      this.List = list;
    },
    setHttpState(value) {
      this.httpState = value;
    },
    setInternetConnectionState(value) {
      this.internetConnectionState = value;
    }
  },
  mounted() {
    this.setLoaderVisibility(true);

    axios
      .get(process.env.VUE_APP_PEOPLE_JSON_FILE, {
        baseURL: process.env.VUE_APP_BASE_URL
      })
      .then(response => {
        this.setList(response.data);
        this.setHttpState("success");
      })
      .catch(() => {
        this.setHttpState("error");

        if (!navigator.onLine)
          this.setInternetConnectionState(navigator.onLine);
      })
      .then(() => {
        this.setLoaderVisibility(false);
      });
  }
};
</script>
