<template>
  <div id="app">
    <header id="site-header">
      <div class="holder">
        <h1 class="sub-title">Data filter App</h1>
      </div>
    </header>
    <main id="main">
      <HomePage />
      <GlobalComponents />
    </main>
    <footer id="site-footer">
      <div class="holder">
        <p class="text">Sergiu Mare - Front End Developer</p>
      </div>
    </footer>
  </div>
</template>

<script>
import "vue-slider-component/theme/antd.css";
import "./scss/libs/normalize.scss";
import "./scss/main.scss";

import HomePage from "./views/HomePage.vue";
import GlobalComponents from "./components/GlobalComponents.vue";
import dotenv from "dotenv";

dotenv.config();

export default {
  name: "App",
  components: {
    HomePage,
    GlobalComponents
  }
};
</script>
