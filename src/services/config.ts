import axios, { AxiosError } from 'axios'
import { getAccessToken } from '@/services/jwt/getAccessToken'
import { logout } from '@/utils'

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
  '/auth/logout',
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
      const isLoggedIn = !!localStorage.getItem('accessToken')
      if (
        error.response?.status === 401 &&
        isLoggedIn &&
        error.request.responseURL !== 'https://inctagram.herokuapp.com/api/auth/logout'
      ) {
        logout()
      }
    }
    return Promise.reject(error)
  }
)
