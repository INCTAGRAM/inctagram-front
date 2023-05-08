import { instance } from '@/services/config'

export const logout = () => {
  instance.post('/auth/logout')
  localStorage.removeItem('accessToken')
}
