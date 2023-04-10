import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import screenStyles from '@/features/screens/screens.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { newPasswordSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import { authService } from '@/services/auth/authService'
import Form from '@/features/form/Form'

type NewPassword = yup.InferType<typeof newPasswordSchema>

interface INewPasswordPage {
  code: string
}

const NewPasswordPage = ({ code }: INewPasswordPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<NewPassword>({ mode: 'onBlur', resolver: yupResolver(newPasswordSchema) })

  const { mutate: createNewPassword } = useMutation({
    mutationFn: authService.createNewPassword,
  })

  const onFormSubmit: SubmitHandler<NewPassword> = ({ newPassword }) => {
    newPassword && createNewPassword({ newPassword, recoveryCode: code })
  }

  return (
    <div className={screenStyles.content_center}>
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
    </div>
  )
}

export default NewPasswordPage
