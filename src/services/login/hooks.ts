import { loginApi } from '@/services/login/loginApi'
import { instance } from '@/services/login/instance'
import { useMutation } from '@tanstack/react-query'

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
