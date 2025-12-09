import { createRouter, createWebHistory } from "vue-router";

import accueil from "../vue/accueil.vue";
import login from "../vue/login.vue";
import createPublication from "../vue/create-publication.vue";
import createAccount from "../vue/create-account.vue";
import profile from "../vue/profile.vue";

const routes = [
  { path: "/", name: "accueil", component: accueil },
  { path: "/create-publication", component: createPublication },
  { path: "/login", component: login },
  { path: "/create-account", component: createAccount },
  { path: "/:username", name: "profile", component: profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
