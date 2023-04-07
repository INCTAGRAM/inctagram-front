import { useMutation } from 'react-query'
import { loginApi } from '@/services/login/loginApi'
import { instance } from '@/services/login/instance'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi.login,
    onSuccess: (res) => {
      const accessToken = res.data.accessToken
      localStorage.setItem('accessToken', accessToken)
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    },
  })
}
