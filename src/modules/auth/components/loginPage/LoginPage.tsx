import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { loginSchema } from '@/modules/auth/helpers/auth-schemes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginMutation } from '@/modules/auth/services/authService'
import { yupResolver } from '@hookform/resolvers/yup'
import { RouteNames } from '@/constants/routes'
import Form from '@/common/ui/form/Form'
import Link from 'next/link'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'
import { addToken } from '@/store/tokenSlice'
import { useAppDispatch } from '@/store/store'
import { useLoginGoogleAuthMutation } from '@/modules/auth/hooks/useLoginGoogleAuthMutation'
import { EmailSendPopup } from '@/modules/auth/components/emailSendPopup/EmailSendPopup'

type LoginType = yup.InferType<typeof loginSchema>

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [login, { data, isError, isSuccess, error }] = useLoginMutation()
  const { push } = useRouter()
  const { loginOauthGoogle, isGoogleSuccess, googleData, displayPopup, setDisplayPopup } = useLoginGoogleAuthMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [data, isSuccess, push])

  useEffect(() => {
    isGoogleSuccess && push(RouteNames.PROFILE)
    googleData && dispatch(addToken(googleData.accessToken))
  }, [googleData, isGoogleSuccess, push])

  const onFormSubmit: SubmitHandler<LoginType> = ({ email, password }) => {
    if (!email || !password) return
    login({ email, password })
  }
  return (
    <>
      <Form
        title="Sign In"
        isTopPanel={true}
        onSubmit={handleSubmit(onFormSubmit)}
        redirect={{ title: "Don't have an account?", link: RouteNames.REGISTER, linkTitle: 'Sign Up' }}
        login={loginOauthGoogle}
      >
        <p>
          <InputText
            fieldName="Email"
            {...register('email')}
            autoComplete="off"
            error={errors.email?.message ? errors.email.message : ''}
          />
        </p>
        <p>
          <InputPassword
            fieldName="Password"
            {...register('password')}
            autoComplete="off"
            error={errors.password?.message ? errors.password.message : ''}
          />
        </p>
        <div>
          <Link href={RouteNames.RECOVERY}>Forgot Password</Link>
        </div>
        <Button type="submit" disabled={!isValid && !isDirty}>
          Sign in
        </Button>
      </Form>
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
      {displayPopup && (
        <EmailSendPopup withoutEmail={true} isShowPopup={displayPopup} setIsShowPopup={setDisplayPopup} />
      )}
    </>
  )
}
