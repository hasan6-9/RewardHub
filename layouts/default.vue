<template>
  <div class="relative min-h-screen overflow-hidden">
    <div ref="bg" class="absolute inset-0 z-0 animate-scroll-bg">
      <div class="h-[200%] w-full">
        <div class="bg-scroll-grid h-full w-full bg-cover bg-top"></div>
      </div>
    </div>

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const bg = ref(null)

onMounted(() => {
  bg.value?.animate([
    { transform: 'translateY(0)' },
    { transform: 'translateY(-50%)' }
  ], {
    duration: 30000,
    iterations: Infinity,
    easing: 'linear'
  })
})
</script>

<style scoped>
.bg-scroll-grid {
  background-image: url('/images/background-grid.png'); /* your composite image */
  background-repeat: repeat-y;
}
@keyframes scroll-bg {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
.animate-scroll-bg {
  animation: scroll-bg 30s linear infinite;
}
</style>
