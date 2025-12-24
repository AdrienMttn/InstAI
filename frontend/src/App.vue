<script setup lang="ts">
import navBar from "./components/navBar.vue";
import appHeader from "./components/appHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <app-header />
  <router-view />
  <nav-bar />
</template>

<style scoped></style>
