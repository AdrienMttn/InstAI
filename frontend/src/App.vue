<script setup lang="ts">
import navBar from "./components/navBar.vue";
import appHeader from "./components/appHeader.vue";
import successToast from "./components/successToast.vue";
import errorToast from "./components/errorToast.vue";
import { RouterView } from "vue-router";
import { ref, type Ref } from "vue";

const errorToastVisible: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");
const successToastVisible: Ref<boolean> = ref(false);
const successMessage: Ref<string> = ref("");

function setErrorToastHasVisible(message: string) {
  errorMessage.value = message;
  errorToastVisible.value = !errorToastVisible.value;
  setTimeout(() => {
    errorToastVisible.value = false;
  }, 3000);
}
// function setErrorToastHasUnvisible() {
//   errorToastVisible.value = false;
// }
function setSuccessToastHasVisible(message: string) {
  successMessage.value = message;
  successToastVisible.value = !successToastVisible.value;
  setTimeout(() => {
    successToastVisible.value = false;
  }, 3000);
}
// function setSuccessToastUnvisible() {
//   successToastVisible.value = false;
// }
</script>

<template>
  <app-header />
  <router-view
    @showError="setErrorToastHasVisible"
    @showSuccess="setSuccessToastHasVisible"
  />
  <success-toast v-if="successToastVisible" :message="successMessage" />
  <error-toast v-if="errorToastVisible" :message="errorMessage" />
  <nav-bar />
</template>

<style scoped></style>
