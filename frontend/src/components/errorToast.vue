<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <div class="alert alert-error fixed z-2 bottom-20 right-0">
    <span>{{ props.message }}</span>
  </div>
</template>
