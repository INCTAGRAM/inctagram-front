import { instance } from '@/services/login/instance'
import { FormType } from '@/common/signIn/SignIn'

export const loginApi = {
  login: ({ email, password }: FormType) => {
    return instance.post('api/auth/login', {
      email,
      password,
    })
  },
}
