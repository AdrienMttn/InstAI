<script setup lang="ts">
const props = defineProps<{
  username: string;
  profile_picture: string;
  nbFollow: number;
  nbFollower: number;
  nbPost: number;
}>();
</script>

<template>
  <div class="flex w-screen justify-center items-center">
    <div class="avatar">
      <div class="w-10 sm:w-15 rounded-full">
        <img :src="props.profile_picture" />
      </div>
    </div>
    <div class="flex flex-col gap-1 p-4">
      <div class="flex gap-3">
        <p>{{ props.username }}</p>
      </div>
      <div class="flex gap-8">
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.nbPost }}</p>
          <p>Publications</p>
        </div>
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.nbFollower }}</p>
          <p>Followers</p>
        </div>
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.nbFollow }}</p>
          <p>Followed</p>
        </div>
      </div>
    </div>
  </div>
</template>
