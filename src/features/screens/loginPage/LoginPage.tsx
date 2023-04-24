import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { loginSchema } from '@/validations/auth-schemes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/authService'
import { yupResolver } from '@hookform/resolvers/yup'
import { RouteNames } from '@/constants/routes'
import Form from '@/features/form/Form'
import Link from 'next/link'
import { ILoginResponse } from '@/services/auth/types'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios'

type LoginType = yup.InferType<typeof loginSchema>

const LoginPage = () => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const {
    mutate: login,
    isSuccess,
    isError,
    error,
  } = useMutation<ILoginResponse, AxiosError, LoginType>({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const accessToken = response.accessToken
      localStorage.setItem('accessToken', accessToken)
    },
  })

  useEffect(() => {
    isSuccess && push(RouteNames.PROFILE)
  }, [isSuccess, push])

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
      {isError && <AlertSnackbar type={'error'} message={errorHandler(error)} />}
    </>
  )
}

export default LoginPage
