<template>
    <div class="dashboard">
      <Navbar />
  
      <section class="user-section">
        <h2>All Users</h2>
        <ul>
          <li v-for="user in users" :key="user._id">
            {{ user.name }} - {{ user.role }}
            <button @click="deleteUser(user._id)">❌ Delete</button>
          </li>
        </ul>
      </section>
  
      <section class="summary-section">
        <h3>Token Summary</h3>
        <p>Total Tokens Issued: {{ totalTokens }}</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import Navbar from '~/components/Navbar.vue'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const users = ref([])
  const totalTokens = ref(0)
  
  onMounted(async () => {
    const res = await axios.get('http://localhost:5000/api/users')
    users.value = res.data
  
    // Later: fetch total tokens from backend or blockchain
    totalTokens.value = 25000 // mock static value
  })
  
  async function deleteUser(userId) {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`)
      users.value = users.value.filter(u => u._id !== userId)
      alert('User deleted')
    } catch (err) {
      alert('Error deleting user')
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    margin: 1rem 0;
  }
  
  button {
    margin-left: 1rem;
  }
  </style>
  