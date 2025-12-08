<script setup lang="ts">
import userService from "../service/userService";
import { useUserStore } from "../stores/userStores";
import { defineModel, type Ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { ref } from "vue";

const username: Ref<string> = defineModel("username", { required: true });
const email: Ref<string> = defineModel("email", { required: true });
const password: Ref<string> = defineModel("password", { required: true });
const confirmPassword: Ref<string> = defineModel("confirmPassword", {
  required: true,
});

const router = useRouter();
const errorMessage = ref(undefined);

async function createAccount() {
  const res = await userService.create(
    username.value,
    email.value,
    password.value
  );
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
      @submit.prevent="createAccount()"
    >
      <div class="avatar justify-center">
        <div class="w-24 rounded-full">
          <img
            :src="`https://avatar.vercel.sh/${
              username || 'sfsfgddfd'
            }?size=500`"
          />
        </div>
      </div>

      <fieldset class="fieldset">
        <label class="label">Username</label>
        <input
          v-model="username"
          type="text"
          required
          placeholder="Username"
          class="input validator rounded w-full"
          minlength="3"
          maxlength="30"
        />
        <span class="validator-hint hidden">Enter valide username</span>
      </fieldset>
      <fieldset class="fieldset">
        <label class="label">Email</label>
        <input
          v-model="email"
          type="email"
          class="input validator rounded w-full"
          placeholder="Email"
          required
        />
        <p class="validator-hint hidden">Enter valide email</p>
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
        <span class="validator-hint hidden">Enter valid password</span>
      </label>
      <label class="fieldset">
        <span class="label">Confirm Password</span>
        <input
          v-model="confirmPassword"
          type="password"
          class="input rounded w-full"
          :class="{
            'input-error': confirmPassword != password,
            'input-success': confirmPassword == password,
          }"
          placeholder="Password"
          required
        />
        <span v-if="confirmPassword != password" class="text-red-600"
          >Enter same password</span
        >
      </label>
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      <button class="btn btn-neutral mt-4 rounded" type="submit">
        Create Account
      </button>
      <RouterLink to="/login" class="btn btn-ghost mt-1" type="reset"
        >Login ?</RouterLink
      >
    </form>
  </div>
</template>
