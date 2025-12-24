<script setup lang="ts">
import { User } from "../../models/user";
import { useUserStore } from "../../stores/userStores";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{ user: User }>();
</script>

<template>
  <div class="flex w-screen justify-center items-center">
    <div class="avatar">
      <div class="w-10 sm:w-15 rounded-full">
        <img :src="props.user.getImg()" />
      </div>
    </div>
    <div class="flex flex-col gap-1 p-4">
      <div class="flex gap-3">
        <p>{{ props.user.getUsername() }}</p>
      </div>
      <div class="flex gap-8">
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.user.getNbPost() }}</p>
          <p>Publications</p>
        </div>
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.user.getNbFollower() }}</p>
          <p>Followers</p>
        </div>
        <div class="text-xs sm:text-sm">
          <p class="font-bold">{{ props.user.getNbFollow() }}</p>
          <p>Followed</p>
        </div>
      </div>
    </div>
    <button
      v-if="!props.user.getisUserConnected()"
      class="btn btn-accent btn-sm"
      @click="
        useUserStore().isLogin
          ? props.user.followUser()
          : router.push({ name: 'login' })
      "
    >
      {{ props.user.getFollow() ? "unfollow" : "follow" }}
    </button>
  </div>
</template>
