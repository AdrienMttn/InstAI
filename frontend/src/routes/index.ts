import { createRouter, createWebHistory } from "vue-router";

import accueil from "../vue/accueil.vue";
import login from "../vue/login.vue";
import createPublication from "../vue/create-publication.vue";
import createAccount from "../vue/create-account.vue";
import profile from "../vue/profile.vue";
import { useUserStore } from "../stores/userStores";

const routes = [
  { path: "/", name: "accueil", component: accueil },
  {
    path: "/create-publication",
    component: createPublication,
    beforeEnter: () => {
      if (!useUserStore().isLogin) {
        router.push({ name: "login" });
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter: () => {
      if (useUserStore().isLogin) {
        router.push({
          name: "profile",
          params: { username: useUserStore().user?.getUsername() },
        });
      }
    },
  },
  {
    path: "/create-account",
    component: createAccount,
    beforeEnter: () => {
      if (useUserStore().isLogin) {
        router.push({
          name: "profile",
          params: { username: useUserStore().user?.getUsername() },
        });
      }
    },
  },
  { path: "/:username", name: "profile", component: profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
