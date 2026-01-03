<script setup lang="ts">
import { ref, type Ref } from "vue";
import userComponent from "../components/userComponent.vue";
import { User } from "../models/user";
import userService from "../service/userService";
import { useRoute } from "vue-router";

const route = useRoute();
const listFollowed: Ref<User[]> = ref([]);

async function initFollowed() {
  const data = await userService.getFollowed(String(route.params.username));
  if (data.error) {
    console.log(data);
  } else {
    data.map((user: any) => {
      listFollowed.value.push(
        new User(
          user.id,
          user.username,
          user.profile_picture,
          0,
          user.nbFollower,
          0,
          user.follow
        )
      );
    });
  }
}
initFollowed();
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="flex flex-col gap-5 min-h-100 max-h-100 w-fit rounded-2xl pt-5 pb-5 md:p-5 md:shadow shadow-accent"
    >
      <h1 class="text-5xl font-bold">Followed</h1>
      <ul
        v-if="listFollowed.length !== 0"
        class="w-screen md:w-[70vw] xl:w-[50vw] list bg-base-100 rounded-box overflow-scroll overflow-x-hidden min-h-75 max-h-75"
      >
        <userComponent :user="follower" v-for="follower in listFollowed" />
      </ul>
      <p
        v-else
        class="w-screen md:w-[70vw] xl:w-[50vw] min-h-75 max-h-75 flex justify-center items-center font-bold text-xl"
      >
        This user has no followers
      </p>
    </div>
  </div>
</template>
