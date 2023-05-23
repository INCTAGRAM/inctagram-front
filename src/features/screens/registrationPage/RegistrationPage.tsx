import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/common/ui/button/Button'
import React, { useEffect, useState } from 'react'
import EmailSendPopup from '@/features/popups/emailSendPopup/EmailSendPopup'
import { useRegistrationMutation } from '@/services/auth/authService'
import { registrationSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import Form from '@/common/ui/form/Form'
import { RouteNames } from '@/constants/routes'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'

type RegistrationType = yup.InferType<typeof registrationSchema>

export const RegistrationPage = () => {
  const [registration, { isError, error, isSuccess }] = useRegistrationMutation()
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  useEffect(() => {
    isSuccess && setIsShowPopup(true)
  }, [isSuccess])

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
