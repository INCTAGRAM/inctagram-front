import { authService } from '@/services/auth/authService'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'

export const Logout = async () => {
  try {
    await authService.logout()
    localStorage.removeItem('accessToken')
    deleteCookie('isLoggedIn')
  } catch (e) {
    errorHandler(e as AxiosError)
  }
}
