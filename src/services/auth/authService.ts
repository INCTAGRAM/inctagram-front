import { instance } from '@/services/config'
import {
  IConfirmationData,
  ILoginData,
  ILoginResponse,
  INewPasswordData,
  IRegistrationData,
} from '@/services/auth/types'

export const authService = {
  login: (payload: ILoginData) => {
    return instance.post<ILoginResponse>('/auth/login', payload).then((response) => response.data)
  },
  logout: () => {
    return instance.post('/auth/logout')
  },
  registration: (payload: IRegistrationData) => {
    return instance.post('/auth/registration', payload).then((response) => response.data)
  },
  confirmation: (code: string) => {
    return instance
      .post<IConfirmationData>('/auth/registration-confirmation', { code })
      .then((response) => response.data)
  },
  resendingConfirmation: (email: string) => {
    return instance.post('/auth/registration-email-resending', { email }).then((response) => response.data)
  },
  passwordRecovery: (email: string) => {
    return instance.post('/auth/password-recovery', { email }).then((response) => response.data)
  },
  createNewPassword: (payload: INewPasswordData) => {
    return instance.post('/auth/new-password', payload).then((response) => response.data)
  },
  refreshToken: () => {
    return instance.post('/api/auth/refresh-token').then((response) => response.data)
  },
}
