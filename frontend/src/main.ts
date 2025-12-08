import { createApp } from "vue";
import { router } from "./routes";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStores";

import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
await useUserStore().initUser();
console.log(useUserStore().user);
