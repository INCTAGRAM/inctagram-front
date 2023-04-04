import { instance } from '@/services/config'

export const authService = {
  passwordRecovery: (email: string) => {
    return instance.post('auth/password-recovery', { email }).then((response) => response.data)
  },
}
