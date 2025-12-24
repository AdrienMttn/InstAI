<script setup lang="ts">
import { User } from "../../models/user";
import { useUserStore } from "../../stores/userStores";
import { RouterLink, useRouter } from "vue-router";
const props = defineProps<{ user: User }>();
const router = useRouter();
</script>

<template>
  <li
    class="list-row flex justify-between items-center"
    v-if="!props.user.getisUserConnected()"
  >
    <RouterLink
      :to="{
        name: 'profile',
        params: { username: props.user.getUsername() },
      }"
      class="flex gap-3 cursor-pointer"
    >
      <img class="size-10 rounded-box" :src="props.user.getImg()" />
      <div>
        <div class="font-bold">{{ props.user.getUsername() }}</div>
        <div class="text-xs font-semibold opacity-60">
          {{ props.user.getNbFollower() }} follower(s)
        </div>
      </div>
    </RouterLink>

    <button
      class="btn btn-accent btn-sm"
      @click="
        useUserStore().isLogin
          ? props.user.followUser()
          : router.push({ name: 'login' })
      "
    >
      {{ props.user.getFollow() ? "unfollow" : "follow" }}
    </button>
  </li>
</template>
