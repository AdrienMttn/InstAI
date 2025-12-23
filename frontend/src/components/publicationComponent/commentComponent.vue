<script setup lang="ts">
import { Comment } from "../../models/comment";

const props = defineProps<{ comment: Comment }>();
</script>

<template>
  <div class="flex flex-col">
    <div class="avatar flex gap-3 items-center">
      <div class="w-8 rounded-full">
        <img :src="props.comment.getProfile_picture()" />
      </div>
      <p class="font-bold text-sm">{{ props.comment.getUsername() }}</p>
    </div>
    <p class="pl-11">
      {{ props.comment.getMessage() }}
    </p>
  </div>
</template>
