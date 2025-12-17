<script setup lang="ts">
import userService from "../service/userService";
import { useUserStore } from "../stores/userStores";
import { useRouter, RouterLink } from "vue-router";
import { ref, type Ref } from "vue";

const email: Ref<string> = defineModel("email", { required: true });
const password: Ref<string> = defineModel("password", { required: true });
const router = useRouter();
const errorMessage = ref(undefined);

async function login() {
  const res = await userService.login(email.value, password.value);
  if (res.success) {
    await useUserStore().initUser();
    router.push({
      name: "profile",
      params: { username: useUserStore().user?.getUsername() },
    });
  } else {
    errorMessage.value = res.error;
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <form
      class="fieldset bg-base-200 border-base-300 rounded-xl w-xs sm:w-lg border p-4"
      @submit.prevent="login"
    >
      <div class="avatar justify-center">
        <div class="w-24 rounded-full">
          <img
            :src="
              'https://boring-avatars-api.vercel.app/api/avatar?size=500&variant=beam&name=' +
              email
            "
          />
        </div>
      </div>
      <fieldset class="fieldse">
        <label class="label">Email</label>
        <input
          v-model="email"
          type="email"
          class="input validator rounded w-full"
          placeholder="Email"
          required
        />
        <p class="validator-hint hidden">Required</p>
      </fieldset>

      <label class="fieldset">
        <span class="label">Password</span>
        <input
          v-model="password"
          type="password"
          class="input validator rounded w-full"
          placeholder="Password"
          required
        />
        <span class="validator-hint hidden">Required</span>
      </label>
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      <button class="btn btn-neutral mt-4 rounded" type="submit">Login</button>
      <button class="btn btn-ghost mt-1" type="reset">Password Lost ?</button>
      <router-link to="/create-account" class="btn btn-ghost mt-1" type="reset"
        >Create Account ?</router-link
      >
    </form>
  </div>
</template>
