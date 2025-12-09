<script setup lang="ts">
import type { Publication } from "../../models/publications";

const props = defineProps<{ post: Publication }>();
</script>

<template>
  <div>
    <img class="w-[30vw] rounded" :src="props.post.getImage_url()" />
  </div>
</template>
