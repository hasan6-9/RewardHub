<template>
  <div class="w-full h-[100vh] overflow-hidden flex flex-col justify-between bg-[#3172a7]">
    <div>
    <div class="py-3 border-b border-white/50 shadow-xl">
      <h1
        class="text-[24px] text-white font-bold flex justify-center items center"
      >
        <img src="/images/111.png" alt="" class="size-10 mr-2" />
        <span class="text-[#F2BB26]">Rew</span>PERKS
      </h1>
    </div>
    <div class="px-3 pt-4">
      <p class="text-[14px] font-semibold text-[#8EB4C6]">MENU</p>
    </div>
    <div class="py-4">
      <ul class="text-white text-[14px] ">
        <NuxtLink
          ><Li class="p-3 border-white/30 mx-2 shadow-xl flex flex-row items-center gap-4 hover:text-[#F2BB26] cursor-pointer"
          >
            <img src="../public/icons/dashboard.svg" alt="" />
            Dashboard</Li
          ></NuxtLink
        >
        <NuxtLink
          ><li
            class="p-3 border-white/30 mx-2 shadow-xl flex flex-row gap-4 items-center hover:text-[#F2BB26] cursor-pointer"
          >
            <img src="../public/icons/tasks.svg" alt="" /> Tasks
          </li></NuxtLink
        >
        <NuxtLink
          ><li
            class="p-3 border-white/30 mx-2 shadow-xl flex flex-row gap-4 items-center hover:text-[#F2BB26] cursor-pointer"
          >
            <img src="../public/icons/achievements.svg" alt="" /> Achievements
          </li></NuxtLink
        >
        <NuxtLink
          ><li
            class="p-3 border-white/30 mx-2 shadow-xl flex flex-row gap-4 items-center hover:text-[#F2BB26] cursor-pointer"
          >
            <img src="../public/icons/store.svg" alt="" /> Store
          </li></NuxtLink
        >
        <NuxtLink
          ><li
            class="p-3 border-white/30 mx-2 shadow-xl flex flex-row gap-4 items-center hover:text-[#F2BB26] cursor-pointer"
          >
            <img src="../public/icons/history.svg" alt="" /> History
          </li></NuxtLink
        >
      </ul>
    </div>
    </div>
    <div class="relative m-1 p-6 rounded-lg bg-[#2f618f] h-[100px] flex items-center">
      <img src="../public/icons/logout.svg" alt="" class="absolute right-2 top-2 cursor-pointer" />
      <div class="text-white flex flex-col items-center justify-center">
        <img src="../public/images/111.png" alt="" class="size-10">
        <h1>Awais Javaid</h1>
        <p class="text-[12px]">awaisjavaid610@gmail.com</p>
      </div>
    </div>
  </div>
</template>
