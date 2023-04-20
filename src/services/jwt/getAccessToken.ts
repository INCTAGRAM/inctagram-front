import { isTokenExpired } from '@/services/jwt/isTokenExpired'
import { AxiosPromise } from 'axios'
import { ILoginResponse } from '@/services/auth/types'
import { authService } from '@/services/auth/authService'

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshTokenRequest === null) {
        refreshTokenRequest = authService.refreshToken()
      }
      const res = await refreshTokenRequest
      refreshTokenRequest = null
      localStorage.setItem('accessToken', res.data.accessToken)
      return res.data.accessToken
    }

    return accessToken
  } catch (e) {
    console.error(e)
    return null
  }
}
