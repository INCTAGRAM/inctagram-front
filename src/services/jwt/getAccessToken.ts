import { isTokenExpired } from '@/services/jwt/isTokenExpired'
import { authService } from '@/services/auth/authService'

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken || isTokenExpired(accessToken)) {
      const res = await authService.refreshToken()
      localStorage.setItem('accessToken', res)
      return res
    }
    return accessToken
  } catch (e) {
    console.error(e)
    return null
  }
}
