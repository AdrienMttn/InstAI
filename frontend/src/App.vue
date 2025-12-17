<script setup lang="ts">
import navBar from "./components/navBar.vue";
import appHeader from "./components/appHeader.vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/userStores";
</script>

<template>
  <app-header />
  <comment-component />
  <router-view />
  <nav-bar :user="useUserStore().user" />
</template>

<style scoped></style>
