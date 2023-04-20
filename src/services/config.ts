import axios from 'axios'
import { authService } from '@/services/auth/authService'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const config = error?.config
    console.log(config)
    if (error.response) {
      if (error.response.status === 401 && !config?.sent) {
        config.sent = true

        // Do something, call refreshToken() request for example;
        // return a request
        console.log(123)
        const response = await authService.refreshToken()

        if (response.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${response?.accessToken}`,
          }
        }
        return axios(config)
      }
    }
    return Promise.reject(error)
  }
)
