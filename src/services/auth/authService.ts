import { instance } from '@/services/config'
import { ILoginData, ILoginResponse, INewPasswordData, IRegistrationData } from '@/services/auth/types'

export const authService = {
  login: (payload: ILoginData) => {
    return instance.post<ILoginResponse>('/auth/login', payload).then((response) => response.data)
  },
  registration: (payload: IRegistrationData) => {
    return instance.post('/auth/registration', payload).then((response) => response.data)
  },
  passwordRecovery: (email: string) => {
    return instance.post('/auth/password-recovery', { email }).then((response) => response.data)
  },
  createNewPassword: (payload: INewPasswordData) => {
    return instance.post('/auth/new-password', payload).then((response) => response.data)
  },
}