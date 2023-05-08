import { isTokenExpired } from '@/services/jwt/isTokenExpired'
import { ITokenResponse } from '@/services/auth/types'
import { instance } from '@/services/config'

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken || isTokenExpired(accessToken)) {
      const { data } = await instance.post<ITokenResponse>('/auth/refresh-token')
      localStorage.setItem('accessToken', data.accessToken)
      return data.accessToken
    }
    return accessToken
  } catch (e) {
    console.error(e)
    return null
  }
}
