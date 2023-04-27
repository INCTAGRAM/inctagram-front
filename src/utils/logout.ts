import { authService } from '@/services/auth/authService'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'

export const logout = async () => {
  try {
    await authService.logout()
    localStorage.removeItem('accessToken')
    deleteCookie('logged-in')
  } catch (e) {
    errorHandler(e as AxiosError)
  }
}
