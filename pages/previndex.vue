<template>
  <div class="flex flex-row ">
    <div class="left w-[50%] h-[100vh] relative flex">
      <img src="../public/images/ach.jpg" alt="" class="h-full object-cover" />
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
    <div class="flex items-start flex-col mb-[61px] ">
      <div class="logo mb-[20px] flex flex-col items-start">
        <img src="../public/images/RHSlogoo.png" alt="" class="ml-[2px] mb-[20px]" />
        <div class="pl-[10px] mb-[10px]">

          <h1 class="title text-[1.5rem] font-bold text-black ">Login to your Dashboard</h1>
          <p class="subtitle text-[#6b7280] text-[13px]">Select your role to access the appropriate features</p>
        </div>
      </div>
      
      <div class="max-w-md w-full">
        <NuxtLink
          to="/login/student"
          @click="studentLogin"
          class="flex items-center gap-4 p-2 rounded-lg border border-gray-200 no-underline transition-all duration-300 mb-5 hover:border-indigo-400 hover:bg-indigo-50"
        >
          <div class="p-2 rounded-lg flex items-center bg-indigo-100">
            <svg viewBox="0 0 24 24" class="w-4 h-4" style="stroke: #4f46e5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-black opacity-90 text-[14px]">Student</h3>
            <p class="text-[12px] text-gray-500">
              Access achievements, balance, and redeem rewards
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/login/faculty"
           @click="facultyLogin"
          class="flex items-center gap-4 p-2 rounded-lg border border-gray-200 no-underline transition-all duration-300 mb-5 hover:border-green-300 hover:bg-green-50"
        >
          <div class="p-2 rounded-lg flex items-center bg-green-100" >
            <svg viewBox="0 0 24 24" class="w-4 h-4" style="stroke: #16a34a">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-black opacity-90 text-[14px] m-0">Faculty</h3>
            <p class="text-[12px] text-gray-500" >
              Manage student achievements and verify submissions
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/login/admin"
           @click="adminLogin"
          class="flex items-center gap-4 p-2 rounded-lg border border-gray-200 no-underline transition-all duration-300 hov5r:border-red-300 hover:bg-red-50"
        >
          <div class="p-2 rounded-lg flex items-center bg-red-100" @click="testToast">
            <svg viewBox="0 0 24 24" class="w-4 h-4" style="stroke: #dc2626">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width=""
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-black opacity-90 text-[14px] m-0">Admin</h3>
            <p class="text-[12px] text-gray-500">
              Configure system settings and manage users
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="footer-text text-[#6b7280] text-[12px]">
        <p>Don't have an account? <a href="#" class="text-[#3172a7] hover:underline">Contact your institution</a></p>
      </div>
  </div>
</div>
</template>
<script setup>
definePageMeta({
  layout: false,
})
import { useToast } from "vue-toastification";

const toast = useToast();

function studentLogin() {
  toast.success("Redirecting to Student Login...", {
    timeout: 2000,  
  });

  setTimeout(() => {
    router.push('/login/student');
  }, 500);
}
function facultyLogin() {
  toast.success("Redirecting to Faculty Login...", {
    timeout: 2000,  
  });

  setTimeout(() => {
    router.push('/login/faculty');
  }, 500);
}
function adminLogin() {
  toast.success("Redirecting to Admin Login...", {
    timeout: 2000,  
  });

  setTimeout(() => {
    router.push('/login/admin');
  }, 2000);
}
</script>
