import Vuex from "vuex";
import Vue from "vue";

import loader from "./loader";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader
  }
});
