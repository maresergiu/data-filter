import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import Error404 from "../views/Error404.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", redirect: 'home' },
    { path: "/home", component: HomePage },
    { path: "/*", component: Error404 }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;