import { defineStore } from "pinia";
import { User } from "../models/user.ts";
import userService from "../service/userService";
import { ref, type Ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user: Ref<User | null> = ref(null);

  async function initUser() {
    try {
      const data = await userService.me();
      if (data.id || data.username || data.email || data.img) {
        user.value = new User(data.id, data.username, data.email, data.img);
      } else {
        throw Error("User not login");
      }
    } catch {
      user.value = null;
    }
  }
  return { initUser, user };
});
