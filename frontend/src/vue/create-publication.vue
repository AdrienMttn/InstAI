<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen gap-10"
  >
    <ul class="steps w-full">
      <li class="step step-success">
        <span class="step-icon">✨</span>
      </li>
      <li class="step">
        <span class="step-icon">🖼️</span>
      </li>
      <li class="step"><span class="step-icon">✔</span></li>
    </ul>
    <div class="w-[90%] sm:w-[80%] flex flex-col gap-2">
      <fieldset class="fieldset rounded">
        <legend class="fieldset-legend">Your prompt</legend>
        <textarea
          class="textarea w-full bg-base-300 rounded resize-none"
          placeholder="prompt"
        ></textarea>
      </fieldset>
      <button class="btn bg-base-300 rounded">Generate</button>
    </div>
  </div>
</template>
