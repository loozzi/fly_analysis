import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

client.interceptors.request.use((config) => {
  return config
})

client.interceptors.response.use((response) => {
  return response.data
})

export default client
// Path: frontend/src/services/axios.service.ts
