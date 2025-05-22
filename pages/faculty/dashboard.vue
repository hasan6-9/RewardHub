<template>
    <div class="dashboard">
      <Navbar />
  
      <section class="student-section">
        <h2>Student List</h2>
        <ul>
          <li v-for="student in students" :key="student._id">
            {{ student.name }} - {{ student.email }}
            <button @click="selectStudent(student)">Add Achievement</button>
          </li>
        </ul>
      </section>
  
      <section class="form-section" v-if="selectedStudent">
        <h3>Add Achievement for {{ selectedStudent.name }}</h3>
        <form @submit.prevent="submitAchievement">
          <select v-model="selectedAchievementId">
            <option v-for="ach in achievements" :value="ach._id" :key="ach._id">
              {{ ach.title }} ({{ ach.tokenReward }} Tokens)
            </option>
          </select>
          <button type="submit">✔ Verify & Issue</button>
        </form>
      </section>
    </div>
  </template>
  
  <script setup>
  import Navbar from '~/components/Navbar.vue'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const students = ref([])
  const achievements = ref([])
  const selectedStudent = ref(null)
  const selectedAchievementId = ref('')
  
  onMounted(async () => {
    const usersRes = await axios.get('http://localhost:5000/api/users') // You'll need a route to get students only
    students.value = usersRes.data.filter(user => user.role === 'student')
  
    const achRes = await axios.get('http://localhost:5000/api/achievements')
    achievements.value = achRes.data
  })
  
  function selectStudent(student) {
    selectedStudent.value = student
  }
  
  async function submitAchievement() {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/student-achievements',
      {
        studentId: selectedStudent.value._id,
        achievementId: selectedAchievementId.value
      }
    );

    if (response.data.success) {
      alert('Achievement submitted for verification!');
      selectedStudent.value = null;
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Error submitting achievement');
  }
}
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  button {
    margin-left: 1rem;
  }
  
  form {
    margin-top: 1rem;
  }
  </style>
  