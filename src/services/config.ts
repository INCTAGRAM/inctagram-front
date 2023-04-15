import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})
