import { authService } from '@/services/auth/authService'

export const Logout = () => {
  authService.logout()
  localStorage.removeItem('accessToken')
}
