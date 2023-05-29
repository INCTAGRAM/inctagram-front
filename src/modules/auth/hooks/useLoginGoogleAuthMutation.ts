import { useEffect, useState } from 'react'
import { useLoginGoogleMutation } from '@/modules/auth/services/authService'
import { useGoogleLogin } from '@react-oauth/google'

export const useLoginGoogleAuthMutation = () => {
  const [code, setCode] = useState('')
  const [displayPopup, setDisplayPopup] = useState(false)
  const [loginGoogle, { data: googleData, isError: isGoogleError, isSuccess: isGoogleSuccess, error: googleError }] =
    useLoginGoogleMutation()
  console.log(googleData, isGoogleError, isGoogleSuccess, googleError)
  // useEffect(() => {
  //   code && loginGoogle({ code })
  // }, [code, loginGoogle])

  useEffect(() => {
    if (googleError) {
      if ('originalStatus' in googleError && googleError.originalStatus === 202) setDisplayPopup(true)
    } else if (code) loginGoogle({ code })
  }, [googleError, code, loginGoogle])

  const loginOauthGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setCode(codeResponse.code),
    flow: 'auth-code',
    onError: () => {
      googleError && console.log(googleError)
    },
  })

  return { loginOauthGoogle, isGoogleSuccess, googleData, displayPopup, setDisplayPopup }
}
