import { useEffect, useState } from 'react'
import { useLoginGoogleMutation } from '@/modules/auth/services/authService'
import { useGoogleLogin } from '@react-oauth/google'

export const useLoginGoogleAuthMutation = () => {
  const [code, setCode] = useState('')
  const [loginGoogle, { data: googleData, isError: isGoogleError, isSuccess: isGoogleSuccess, error: googleError }] =
    useLoginGoogleMutation()

  useEffect(() => {
    code && loginGoogle({ code })
  }, [code, loginGoogle])

  const loginOauthGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setCode(codeResponse.code),
    flow: 'auth-code',
    onError: () => {
      googleError && console.log(googleError)
    },
  })
  return { loginOauthGoogle, isGoogleSuccess, googleData }
}
