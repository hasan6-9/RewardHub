<template>
  <div
    class="relative z-20 w-full max-w-md mx-auto p-8 bg-[#04162a8b] backdrop-blur-md rounded-[30px] text-center shadow-2xl"
  >
    <div class="flex justify-center mb-6 h-25">
      <!-- Framer logo -->
      <img src="/images/111.png" alt="Framer Logo" class="object-cover" />
    </div>
    <h2 class="text-white text-2xl font-semibold mb-6">Welcome to RewardSystem</h2>
    <input type="text" class="p-4 rounded-[15px] bg-black/20 w-[95%] mb-4 text-white" v-model="username" placeholder="Username">
    <input type="password" class="p-4 rounded-[15px] bg-black/20 w-[95%] mb-6 text-white" v-model="password" placeholder="Password">
    <button @click="login" class="w-full bg-[#0c5eba] hover:bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center mb-3">
      Login
    </button>
  </div>
</template>
<script setup>
const username = ref();
const password = ref();

function login (){
if (username.value === "Awais@610" && password.value ==="Jerry@610") {
  window.location.href = "/student/dashboard";
}else {
  alert("Invalid username or password");
  }
  }
</script>