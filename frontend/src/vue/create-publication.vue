<script setup lang="ts">
import { useUserStore } from "../stores/userStores";
import userService from "../service/userService";
import { ref, type Ref } from "vue";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "vue-router";

gsap.registerPlugin(ScrollToPlugin);

const router = useRouter();
const emit = defineEmits<{
  (e: "showError", message: string): void;
  (e: "showSuccess", message: string): void;
}>();
const prompt: Ref<string> = defineModel("prompt", { required: true });
const promptError: Ref<boolean> = ref(false);
const imageGen: Ref<string | undefined> = ref(undefined);
const isLoading: Ref<boolean> = ref(false);

async function Generate() {
  isLoading.value = true;
  imageGen.value = undefined;
  promptError.value = false;
  if (!prompt.value) {
    promptError.value = true;
    isLoading.value = false;
    return;
  }
  const res = await userService.generate(prompt.value);
  if (res.image) {
    imageGen.value = `data:image/png;base64,${res.image}`;
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: ".card",
        offsetY: 50,
      },
    });
    emit("showSuccess", "image generate");
  } else {
    emit("showError", res.error);
  }

  isLoading.value = false;
}

async function postPublication() {
  isLoading.value = true;
  const res = await userService.postPublication();
  isLoading.value = false;
  if (res.success) {
    emit("showSuccess", res.success);
    router.push({ name: "accueil" });
  } else {
    emit("showError", res.error);
  }
}
</script>

<template>
  <div
    class="w-full min-h-screen pt-20 pb-40 flex flex-col items-center justify-center gap-10"
  >
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Your prompt</legend>
      <textarea
        v-model="prompt"
        class="textarea w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-24 bg-base-300 resize-none rounded"
        placeholder="Prompt"
      ></textarea>
      <button
        :class="{ 'btn-disabled': isLoading }"
        class="btn btn-primary btn-outline rounded"
        @click="Generate()"
      >
        ✨ Generate ✨
      </button>
      <p class="text-red-600" v-if="promptError">Enter a prompt</p>
    </fieldset>

    <div class="card">
      <div class="md:w-[50vw] lg:w-[40vw] xl:w-[25vw] flex flex-col gap-2">
        <div
          class="avatar flex justify-start items-center gap-3 cursor-pointer p-2"
        >
          <div class="w-8 rounded-full">
            <img :src="useUserStore().user?.getImg()" />
          </div>
          <p class="font-bold text-sm">
            {{ useUserStore().user?.getUsername() }}
          </p>
        </div>
        <div class="w-full aspect-square relative">
          <img
            v-if="imageGen && !isLoading"
            class="rounded w-full h-full object-cover"
            :src="imageGen"
          />
          <div
            v-else
            class="rounded skeleton w-full h-full flex justify-center items-center"
          >
            <span v-if="isLoading" class="loading loading-ring w-20"></span>
          </div>
        </div>
        <div class="card-actions justify-start gap-5 cursor-default p-2">
          <div class="flex justify-center items-center gap-2">
            <button class="cursor-pointer">
              <svg
                aria-label="J’aime"
                class="x1lliihq x1n2onr6 xyb1xck"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>J’aime</title>
                <path
                  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                ></path>
              </svg>
            </button>
            <p>100K</p>
          </div>
          <div class="flex justify-center items-center gap-2">
            <button class="cursor-pointer">
              <svg
                aria-label="Commenter"
                class="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Commenter</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </button>
            <p>10K</p>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="imageGen"
      :class="{ 'btn-disabled': isLoading }"
      class="btn btn-primary btn-outline rounded-2xl"
      @click="postPublication()"
    >
      Post ⌲
    </button>
  </div>
</template>
