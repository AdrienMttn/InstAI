<script setup lang="ts"></script>
<template>
  <header
    class="w-screen h-15 fixed z-1 bg-base-100 border-b border-base-300 flex items-center"
  >
    <!-- Logo et nom -->
    <div class="flex items-center text-accent">
      <div class="rounded-xl flex items-center justify-center">
        <svg
          class="w-15 h-15"
          fill="none"
          viewBox="0 0 40 40"
          stroke-width="1.5"
        >
          <!-- Couche d'entrée (gauche) -->
          <circle cx="8" cy="12" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="8" cy="20" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="8" cy="28" r="2.5" fill="currentColor" opacity="0.8" />

          <!-- Couche cachée (milieu) -->
          <circle cx="20" cy="8" r="3" fill="currentColor" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="20" cy="32" r="3" fill="currentColor" />

          <!-- Couche de sortie (droite) -->
          <circle cx="32" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="32" cy="26" r="2.5" fill="currentColor" opacity="0.8" />

          <!-- Connexions - Entrée vers Cachée -->
          <line
            x1="10"
            y1="12"
            x2="18"
            y2="8"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="10"
            y1="12"
            x2="18"
            y2="20"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="10"
            y1="20"
            x2="18"
            y2="8"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="10"
            y1="20"
            x2="18"
            y2="20"
            stroke="currentColor"
            opacity="0.4"
          />
          <line
            x1="10"
            y1="20"
            x2="18"
            y2="32"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="10"
            y1="28"
            x2="18"
            y2="20"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="10"
            y1="28"
            x2="18"
            y2="32"
            stroke="currentColor"
            opacity="0.3"
          />

          <!-- Connexions - Cachée vers Sortie -->
          <line
            x1="22"
            y1="8"
            x2="30"
            y2="14"
            stroke="currentColor"
            opacity="0.4"
          />
          <line
            x1="22"
            y1="8"
            x2="30"
            y2="26"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="22"
            y1="20"
            x2="30"
            y2="14"
            stroke="currentColor"
            opacity="0.4"
          />
          <line
            x1="22"
            y1="20"
            x2="30"
            y2="26"
            stroke="currentColor"
            opacity="0.4"
          />
          <line
            x1="22"
            y1="32"
            x2="30"
            y2="14"
            stroke="currentColor"
            opacity="0.3"
          />
          <line
            x1="22"
            y1="32"
            x2="30"
            y2="26"
            stroke="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
      <h1 class="text-2xl font-bold">InstAI</h1>
    </div>
  </header>
</template>
