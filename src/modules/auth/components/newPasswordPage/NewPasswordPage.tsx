import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { newPasswordSchema } from '@/modules/auth/helpers/auth-schemes'
import * as yup from 'yup'
import { useCreateNewPasswordMutation } from '@/modules/auth/services/authService'
import Form from '@/common/ui/form/Form'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'

type NewPassword = yup.InferType<typeof newPasswordSchema>

interface INewPasswordPage {
  code: string
  email: string
}

const NewPasswordPage = ({ code, email }: INewPasswordPage) => {
  const [createNewPassword, { isSuccess, isError, error: error }] = useCreateNewPasswordMutation()
  const { push } = useRouter()

  useEffect(() => {
    if (isSuccess) {
      push(RouteNames.NEW_PASSWORD_CONFIRMATION)
    }

    if (error && 'data' in error && error.status === 410) {
      push({
        pathname: RouteNames.RECOVERY_EXPIRED,
        query: { email },
      })
    }
  }, [isSuccess, error])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<NewPassword>({ mode: 'onBlur', resolver: yupResolver(newPasswordSchema) })

  const onFormSubmit: SubmitHandler<NewPassword> = ({ newPassword }) => {
    newPassword && createNewPassword({ newPassword, recoveryCode: code })
  }

  return (
    <>
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
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}

export default NewPasswordPage
