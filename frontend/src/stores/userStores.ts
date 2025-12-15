import { defineStore } from "pinia";
import { User } from "../models/user";
import userService from "../service/userService";
import { ref, type Ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user: Ref<User | null> = ref(null);
  const isLogin: Ref<boolean> = ref(false);

  async function initUser() {
    try {
      const data = await userService.me();
      if (data.id || data.username || data.email || data.img) {
        user.value = new User(data.id, data.username, data.email, data.img);
        isLogin.value = true;
      } else {
        throw Error("User not login");
      }
    } catch {
      user.value = null;
      isLogin.value = false;
    }
  }
  return { initUser, user, isLogin };
});
