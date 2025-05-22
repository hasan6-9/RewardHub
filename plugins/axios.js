import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Your backend URL
    timeout: 10000
  })

  nuxtApp.provide('axios', api)
})
