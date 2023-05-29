import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/common/ui/button/Button'
import React, { useEffect, useState } from 'react'
import { useRegistrationMutation } from '@/modules/auth/services/authService'
import { registrationSchema } from '@/modules/auth/helpers/auth-schemes'
import * as yup from 'yup'
import Form from '@/common/ui/form/Form'
import { RouteNames } from '@/constants/routes'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'
import { useLoginGoogleAuthMutation } from '@/modules/auth/hooks/useLoginGoogleAuthMutation'
import { addToken } from '@/store/tokenSlice'
import { useAppDispatch } from '@/store/store'
import { useRouter } from 'next/navigation'
import { EmailSendPopup } from '@/modules/auth/components/emailSendPopup/EmailSendPopup'

type RegistrationType = yup.InferType<typeof registrationSchema>

export const RegistrationPage = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const [registration, { isError, error, isSuccess }] = useRegistrationMutation()
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)
  const { loginOauthGoogle, isGoogleSuccess, googleData } = useLoginGoogleAuthMutation()

  useEffect(() => {
    isSuccess && setIsShowPopup(true)
  }, [isSuccess])

  useEffect(() => {
    isGoogleSuccess && push(RouteNames.PROFILE)
    googleData && dispatch(addToken(googleData.accessToken))
  }, [googleData, isGoogleSuccess, push])

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<RegistrationType>({ mode: 'onTouched', resolver: yupResolver(registrationSchema) })

  const onFormSubmit: SubmitHandler<RegistrationType> = ({ username, email, password }) => {
    if (!email || !password || !username) return

    registration({ username, email, password })
    setEmail(email)
    reset()
  }

  return (
    <>
      <Form
        title="Sign Up"
        isTopPanel={true}
        onSubmit={handleSubmit(onFormSubmit)}
        redirect={{ title: 'Do you have an account?', link: RouteNames.LOGIN, linkTitle: 'Sign In' }}
        login={loginOauthGoogle}
      >
        <p>
          <InputText
            fieldName={'Username'}
            autoComplete="off"
            {...register('username')}
            error={errors.username?.message ? errors.username.message : ''}
          />
        </p>
        <p>
          <InputText
            fieldName={'Email'}
            autoComplete="off"
            {...register('email')}
            error={errors.email?.message ? errors.email.message : ''}
          />
        </p>
        <p>
          <InputPassword
            fieldName={'Password'}
            autoComplete="off"
            {...register('password')}
            error={errors.password?.message ? errors.password.message : ''}
          />
        </p>
        <p>
          <InputPassword
            fieldName={'Password confirmation'}
            autoComplete="off"
            {...register('passwordConfirmation')}
            error={errors.passwordConfirmation?.message ? errors.passwordConfirmation.message : ''}
          />
        </p>
        <Button type="submit" disabled={!isValid && !isDirty}>
          Sign Up
        </Button>
      </Form>
      <EmailSendPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}
