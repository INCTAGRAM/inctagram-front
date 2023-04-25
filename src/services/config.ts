import axios, { AxiosError } from 'axios'
import { authService } from '@/services/auth/authService'
import { getAccessToken } from '@/services/jwt/getAccessToken'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const urlsSkipAuth = [
  '/auth/login',
  '/auth/registration',
  '/auth/registration-confirmation',
  '/auth/registration-email-resending',
  '/auth/password-recovery',
  '/auth/new-password',
  '/api/auth/refresh-token',
]

instance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config
  }
  const accessToken = await getAccessToken()
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

instance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('accessToken')
      if (error.response?.status === 401 && isLoggedIn) {
        authService.logout()
      }
    }
    return Promise.reject(error)
  }
)
//
// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const config = error?.config
//     console.log(config)
//     if (error.response) {
//       if (error.response.status === 401 && !config?.sent) {
//         config.sent = true
//         const response = await authService.refreshToken()
//         if (response.accessToken) {
//           config.headers = {
//             ...config.headers,
//             authorization: `Bearer ${response?.accessToken}`,
//           }
//         }
//         return config
//       }
//     }
//     return Promise.reject(error)
//   }
// )
