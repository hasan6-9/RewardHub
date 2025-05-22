<template>
    <div class="student-lookup">
      <form @submit.prevent="checkStudent">
        <input 
          v-model="email"
          type="email"
          placeholder="Enter student email"
          required
        >
        <button type="submit">Search</button>
      </form>
  
      <div v-if="loading">Loading...</div>
      
      <div v-if="error" class="error">{{ error }}</div>
  
      <div v-if="studentData" class="student-details">
        <h2>{{ studentData.name }}</h2>
        <p>Email: {{ studentData.email }}</p>
        <p>Token Balance: {{ studentData.tokenBalance }}</p>
        
        <h3>Achievements:</h3>
        <div v-for="(achievement, index) in studentData.achievements" :key="index">
          <p>{{ achievement.title }} - {{ achievement.tokens }} tokens</p>
          <small>{{ new Date(achievement.issuedAt).toLocaleDateString() }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const email = ref('');
  const studentData = ref(null);
  const loading = ref(false);
  const error = ref('');
  
  const checkStudent = async () => {
    try {
      loading.value = true;
      error.value = '';
      debugger
      const response = await $fetch(`/api/users/email/${encodeURIComponent(email.value)}`);
      
      if (response.success) {
        studentData.value = response.data;
      } else {
        error.value = 'Student not found';
      }
    } catch (err) {
      error.value = err.data?.message || 'Error fetching student data';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .student-lookup {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 300px;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
  
  .student-details {
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
  }
  </style>