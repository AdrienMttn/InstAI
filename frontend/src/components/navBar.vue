<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStores";
</script>

<template>
  <div class="dock border-t border-base-300">
    <RouterLink
      :to="{ name: 'accueil' }"
      activeClass="scale-125 transition duration-200 ease-out"
      exactActiveClass="scale-100 transition duration-200 ease-out"
    >
      <svg
        aria-label="Accueil"
        class="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Accueil</title>
        <path
          d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"
        ></path>
      </svg>
    </RouterLink>

    <RouterLink
      to="/create-publication"
      activeClass="scale-125 transition duration-200 ease-out"
      exactActiveClass="scale-100 transition duration-200 ease-out"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill=""
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
          fill="currentColor"
        />
      </svg>
    </RouterLink>
    <RouterLink
      :to="'/search'"
      activeClass="scale-125 transition duration-200 ease-out"
      exactActiveClass="scale-100 transition duration-200 ease-out"
    >
      <svg
        aria-label="Recherche"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Recherche</title>
        <path
          d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          x1="16.511"
          x2="21.643"
          y1="16.511"
          y2="21.643"
        ></line>
      </svg>
    </RouterLink>
    <RouterLink
      :to="
        useUserStore().isLogin
          ? {
              name: 'profile',
              params: { username: useUserStore().user?.getUsername() },
            }
          : '/login'
      "
      class="avatar"
      activeClass="scale-125 transition duration-200 ease-out"
      exactActiveClass="scale-100 transition duration-200 ease-out"
    >
      <div class="rounded-full w-[25%]">
        <img
          :src="
            useUserStore().isLogin
              ? useUserStore().user?.getImg()
              : 'https://boring-avatars-api.vercel.app/api/avatar?size=500&variant=beam'
          "
        />
      </div>
    </RouterLink>
  </div>
</template>
