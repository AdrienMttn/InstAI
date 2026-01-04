<script setup lang="ts">
import userService from "../service/userService";
import { useUserStore } from "../stores/userStores";
import { type Ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { ref } from "vue";

const username: Ref<string> = defineModel("username", { required: true });

const router = useRouter();
const errorMessage = ref(undefined);

const emit = defineEmits<{
  (e: "showError", message: string): void;
  (e: "showSuccess", message: string): void;
}>();

async function create() {
  const res = await userService.create(username.value);
  if (res.success) {
    await useUserStore().initUser();
    emit("showSuccess", res.success);
    router.push({
      name: "profile",
      params: { username: useUserStore().user?.getUsername() },
    });
  } else {
    emit("showError", res.error);
    errorMessage.value = res.error;
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <form
      class="fieldset bg-base-200 border-base-300 rounded-xl w-xs sm:w-lg border p-4"
      @submit.prevent="create"
    >
      <div class="avatar justify-center">
        <div class="w-24 rounded-full">
          <img
            :src="`https://boring-avatars-api.vercel.app/api/avatar?size=500&variant=beam&name=${username}`"
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
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      <button class="btn btn-neutral mt-4 rounded" type="submit">
        Create Account
      </button>
      <RouterLink to="/" class="btn btn-neutral mt-4 rounded"
        >Cancel</RouterLink
      >
    </form>
  </div>
</template>
