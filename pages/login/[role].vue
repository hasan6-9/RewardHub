<template>
  <div class="flex flex-row">
    <div class="left w-[50%] h-[100vh] relative flex">
      <img src="/public/images/ach.jpg" alt="" class="h-full object-cover" />
      <div
        class="absolute top-105 left-7 w-[90%] h-[28%] rounded-2xl bg-black opacity-85"
      >
        <div
          class="flex flex-col justify-center items-center h-full text-white"
        >
          <h2 class="text-4xl font-bold">Welcome To RewardHub!</h2>
          <p class="text-lg mt-4 w-[65%]">
            Blockchain-based achievement tracking and rewards platform for
            educational institutions
          </p>
        </div>
      </div>
    </div>
    <div
      class="right flex flex-col items-center w-[50%] h-[100vh] bg-white pt-[60px]"
    >
      <div class="flex items-start flex-col mb-[30px] pl-[11px]">
        <div class="logo mb-[20px] flex flex-col items-start">
          <img
            src="/public/images/RHSlogoo.png"
            alt=""
            class="pr-[122px] mb-[20px]"
          />
          <h1 class="title text-[1.5rem] font-bold text-black">Welcome!</h1>
          <p class="subtitle text-[#2a2b2c] text-[13px]">
            Login to access
            <span class="font-bold text-[14px]"> {{ capitalizedRole }} </span>
            dashboard
          </p>
        </div>
        <div class="flex flex-col">
          <label for="email" class="mb-[6px] font-bold text-sm"
            >{{ capitalizedRole === "Admin" ? "Username" : "System ID" }}
            <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="email"
            id="email"
            class="border ml-[2px] border-[#96a2acc9] text-[13px] text-gray-800 p-2 mb-4 w-[360px] rounded-md"
          />
          <label for="password" class="mb-[6px] font-bold text-sm"
            >Password <span class="text-red-500">*</span></label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            class="border ml-[2px] border-[#96a2acc9] text-[13px] p-2 mb-4 w-[360px] rounded-md"
          />
          <div class="flex items-center justify-between mb-6 ml-1">
            <div class="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rem"
                class="w-6 h-6 appearance-none rounded-lg cursor-pointer border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 mr-2"
              />
              <label for="rem" class="text-sm">Remember me?</label>
            </div>
            <a href="#" class="text-[12px] text-[#3172a7] hover:underline"
              >Forget Password?</a
            >
          </div>
          <div class="flex flex-col items-center">
            <button
              class="w-[100%] bg-[#3172a7] text-white py-[12px] rounded-md text-sm cursor-pointer"
              @click="handleLogin"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div class="footer-text text-[#6b7280] text-[12px]">
        <p>
          Don't have an account?
          <a href="#" class="text-[#3172a7] hover:underline"
            >Contact your institution</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const email = ref("");
const password = ref("");
const capitalizedRole = route.params.role.toUpperCase() || "none";

async function handleLogin() {
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email: email.value,
      password: password.value,
    });

    if (res.data?.role === capitalizedRole.toLowerCase()) {
      toast.success("Login successful!", { timeout: 2000 });
      router.push(`/${res.data.role}/dashboard`);
    } else {
      toast.error("Invalid credentials or role", { timeout: 3000 });
    }
  } catch (err) {
    toast.error("Login failed. Please try again.", { timeout: 3000 });
  }
}
</script>
