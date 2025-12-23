<script setup lang="ts">
import type { Publication } from "../../models/publications";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{ post: Publication }>();
</script>

<template>
  <div
    @click="
      router.push({
        name: 'publication',
        params: {
          username: props.post.getUsername(),
          idPost: props.post.getId(),
        },
      })
    "
  >
    <img
      class="w-[30vw] rounded cursor-pointer"
      :src="props.post.getImage_url()"
    />
  </div>
</template>
