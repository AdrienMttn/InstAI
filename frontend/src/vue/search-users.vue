<script setup lang="ts">
import { ref, type Ref } from "vue";
import userComponent from "../components/searchComponent/userComponent.vue";
import { User } from "../models/user";
import userService from "../service/userService";

const username: Ref<string> = ref("");
const listUsers: Ref<User[]> = ref([]);

async function initUsers() {
  const data = await userService.exploreUsers();
  data.map((user: any) => {
    listUsers.value.push(
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

async function searchUsers() {
  const data = await userService.searchUsers(username.value);
  listUsers.value = [];
  data.map((user: any) => {
    listUsers.value.push(
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
initUsers();
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center gap-2">
    <label class="input outline-none">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        @input="searchUsers()"
        type="search"
        required
        placeholder="username"
        v-model="username"
      />
    </label>
    <ul
      class="w-screen md:w-[70vw] xl:w-[50vw] list bg-base-100 rounded-box shadow-md max-h-[60vh] overflow-scroll overflow-x-hidden"
    >
      <userComponent :user="user" v-for="user in listUsers" />
    </ul>
  </div>
</template>
