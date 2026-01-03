import { createRouter, createWebHistory } from "vue-router";
import accueil from "../vue/accueil.vue";
import login from "../vue/login.vue";
import createPublication from "../vue/create-publication.vue";
import createAccount from "../vue/create-account.vue";
import profile from "../vue/profile.vue";
import publication from "../vue/publication.vue";
import searchUsers from "../vue/search-users.vue";
import followers from "../vue/followers.vue";
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
  { path: "/:username/:idPost", name: "publication", component: publication },
  { path: "/:username/followers", name: "followers", component: followers },
  { path: "/search", name: "search", component: searchUsers },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
