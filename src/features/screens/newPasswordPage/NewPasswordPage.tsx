import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { newPasswordSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import { authService } from '@/services/auth/authService'
import Form from '@/features/form/Form'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { AxiosError } from 'axios'
import { INewPasswordError } from '@/services/auth/types'
import { MailVerificationErrors } from '@/constants/errorMessages'

type NewPassword = yup.InferType<typeof newPasswordSchema>

interface INewPasswordPage {
  code: string
  email: string
}

const NewPasswordPage = ({ code, email }: INewPasswordPage) => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<NewPassword>({ mode: 'onBlur', resolver: yupResolver(newPasswordSchema) })

  const { mutate: createNewPassword } = useMutation<unknown, AxiosError<INewPasswordError>, any>({
    mutationFn: authService.createNewPassword,
    onSuccess: () => {
      push(RouteNames.NEW_PASSWORD_CONFIRMATION)
    },
    onError: (err) => {
      const message = err.response?.data.message[0]
      if (message === MailVerificationErrors.Expired || message === MailVerificationErrors.NoExists) {
        push({
          pathname: RouteNames.RECOVERY_EXPIRED,
          query: { email },
        })
      }
    },
  })

  const onFormSubmit: SubmitHandler<NewPassword> = ({ newPassword }) => {
    newPassword && createNewPassword({ newPassword, recoveryCode: code })
  }

  return (
    <Form title="Create New Password" onSubmit={handleSubmit(onFormSubmit)}>
      <p>
        <InputPassword
          fieldName="New Password"
          type="password"
          {...register('newPassword')}
          error={errors.newPassword?.message ? errors.newPassword.message : ''}
        />
      </p>
      <p>
        <InputPassword
          fieldName="Password Confirmation"
          type="password"
          {...register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message ? errors.passwordConfirmation.message : ''}
        />
      </p>
      <p>Your password must be between 6 and 20 characters</p>
      <Button type="submit" disabled={!isValid && !isDirty}>
        Create new password
      </Button>
    </Form>
  )
}

export default NewPasswordPage
