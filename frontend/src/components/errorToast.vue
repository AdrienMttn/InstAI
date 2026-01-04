<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const props = defineProps<{ message: string }>();

const toastRef = ref<HTMLElement | null>(null);
const particlesRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (toastRef.value && particlesRef.value) {
    // Animation des particules
    const particles = particlesRef.value.children;
    gsap.fromTo(
      particles,
      {
        scale: 0,
        x: 0,
        y: 0,
        opacity: 1,
      },
      {
        scale: 1,
        x: (index) => Math.cos((index / particles.length) * Math.PI * 2) * 100,
        y: (index) => Math.sin((index / particles.length) * Math.PI * 2) * 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.02,
      }
    );

    // Animation du toast
    gsap.fromTo(
      toastRef.value,
      {
        scale: 0,
        opacity: 0,
        rotation: -180,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(2)",
        delay: 0.2,
      }
    );
  }
});
</script>

<template>
  <div class="toast-container">
    <div ref="particlesRef" class="particles">
      <div v-for="i in 12" :key="i" class="particle"></div>
    </div>
    <div ref="toastRef" class="alert alert-error fixed z-2 bottom-20 right-2">
      <span class="text-error-content">{{ props.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 5rem;
  right: 0;
  z-index: 2;
}

.particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(45deg, #ef4444, #dc2626);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}
</style>
