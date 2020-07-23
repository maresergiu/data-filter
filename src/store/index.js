import Vuex from "vuex";
import Vue from "vue";

import loader from "./loader";
import searchForm from "./searchForm";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    searchForm
  }
});
