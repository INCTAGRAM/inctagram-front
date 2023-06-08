import { useEffect, useState } from 'react'
import { useLoginGoogleMutation } from '@/modules/auth/services/authService'
import { useGoogleLogin } from '@react-oauth/google'
import { addToken } from '@/store/tokenSlice'
import { RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { useRouter } from 'next/navigation'

export const useLoginGoogleAuthMutation = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const [code, setCode] = useState('')
  const [displayPopup, setDisplayPopup] = useState(false)
  const [loginGoogle, { data: googleData, isSuccess: isGoogleSuccess, error: googleError }] = useLoginGoogleMutation()

  useEffect(() => {
    !!code && loginGoogle({ code })
  }, [code, loginGoogle])

  useEffect(() => {
    if (googleData && googleData.email) {
      setDisplayPopup(true)
    }
  }, [googleData?.email])

  useEffect(() => {
    googleData?.accessToken && !googleData?.email && dispatch(addToken(googleData.accessToken))
    googleData?.accessToken && !googleData?.email && push(RouteNames.PROFILE)
  }, [googleData?.accessToken, googleData?.email, push])

  const loginOauthGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setCode(codeResponse.code),
    flow: 'auth-code',
    onError: () => {
      googleError && console.log(googleError)
    },
  })

  return { loginOauthGoogle, isGoogleSuccess, googleData, displayPopup, setDisplayPopup }
}
