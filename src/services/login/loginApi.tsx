import { instance } from '@/services/login/instance'
import { AxiosResponse } from 'axios'
import { FormType } from '@/features/signIn/SignIn'

export type LoginResponseType = {
  accessToken: string
}

export const loginApi = {
  login: ({ email, password }: FormType) => {
    return instance.post<'', AxiosResponse<LoginResponseType, FormType>>('api/auth/login', {
      email,
      password,
    })
  },
}
