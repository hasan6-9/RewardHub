<template>
  <div class="absolute inset-0 z-0 flex">
    <div
      v-for="(columnImages, index) in columns"
      :key="index"
      class="w-1/5 h-full overflow-hidden relative"
    >
      <div
        class="absolute w-full"
        :class="index % 2 === 0 ? 'animate-scroll-up' : 'animate-scroll-down'"
      >
        <!-- Repeat enough times (e.g., 5x) -->
        <div v-for="i in 5" :key="i">
          <div v-for="(image, idx) in columnImages" :key="idx" class="rounded-lg m-1">
            <img
              :src="image"
              class="w-full h-[450px] object-cover rounded-lg"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

   <!-- Overlay -->
<div class="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-[#04001f] via-[#011f52cc] to-[#015fc4c5]" />
  </div>
</template>

<script setup>
const columns = [
    ['/images/collage/1.jpg', '/images/collage/col1.1.jpg'],
    ['/images/collage/col1.2.jpg', '/images/collage/col1.3.jpg'],
    ['/images/collage/col1.4.jpg', '/images/collage/col1.5.jpg'],
    ['/images/collage/col1.7.jpg', '/images/collage/col1.6.jpg'],
    ['/images/collage/col1.8.jpg', '/images/collage/col1.9.jpg']
];
</script>

<style scoped>
@keyframes scroll-up {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes scroll-down {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }
}

.animate-scroll-up {
  animation: scroll-up 300s linear infinite;
}
.animate-scroll-down {
    animation: scroll-up 500s linear infinite;

}
</style>
