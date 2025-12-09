<script setup lang="ts">
import profilePublication from "./profilePublication.vue";
import { Publication } from "../../models/publications";
const props = defineProps<{ posts: Publication[] }>();
</script>
<template>
  <div class="flex flex-col justify-center items-center gap-5">
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      class=""
      style=""
    >
      <title>Publications</title>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2px"
        d="M3 3H21V21H3z"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2px"
        d="M9.01486 3 9.01486 21"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2px"
        d="M14.98514 3 14.98514 21"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2px"
        d="M21 9.01486 3 9.01486"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2px"
        d="M21 14.98514 3 14.98514"
      ></path>
    </svg>
    <div class="flex flex-wrap items-center justify-center gap-1">
      <profilePublication :post="post" v-for="post in props.posts" />
    </div>
  </div>
</template>
