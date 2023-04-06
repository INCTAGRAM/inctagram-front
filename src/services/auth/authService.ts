import { instance } from '@/services/config'
import { INewPassword } from '@/services/auth/types'

export const authService = {
  passwordRecovery: (email: string) => {
    return instance.post('auth/password-recovery', { email }).then((response) => response.data)
  },
  createNewPassword: (payload: INewPassword) => {
    return instance.post('auth/new-password', { payload }).then((response) => response.data)
  },
}
