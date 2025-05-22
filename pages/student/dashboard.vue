<template>
  <div class="flex">
    <div class="left w-[16%] bg-black">
      <baseSideBar />
    </div>
    <div class="right p-5 flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-[28px]">Good Morning</h1>
        </div>
        <div class="flex flex-wrap gap-4">
          <statCard v-for="i in 10" :key="i" />
        </div>
      </div>
      <div class="p-4 shadow rounded border border-black/10 bg-white">
        <h2 class="font-bold text-lg mb-2">Daily Report</h2>
        <div class="h-48">
          <LineChart :chart-data="chartData" :chart-options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const chartData = {
  labels: ["Today"],
  datasets: [
    {
      label: "Files",
      data: [2],
      borderColor: "#003f88",
      backgroundColor: "transparent",
    },
    {
      label: "Finalized Cases",
      data: [1.8],
      borderColor: "#38b000",
      backgroundColor: "transparent",
    },
    {
      label: "Converted Cases",
      data: [1.4],
      borderColor: "#00b4d8",
      backgroundColor: "transparent",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
    x: {},
  },
};
</script>
