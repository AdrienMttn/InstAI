import { createRouter, createWebHistory } from "vue-router";

import accueil from "../vue/accueil.vue";
import createPublication from "../vue/create-publication.vue";

const routes = [
  { path: "/", component: accueil },
  { path: "/create-publication", component: createPublication },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
