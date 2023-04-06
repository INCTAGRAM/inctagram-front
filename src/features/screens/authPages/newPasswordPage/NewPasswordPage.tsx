import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import authStyles from '@/features/screens/authPages/authPages.module.scss'
import RecoveryForm from '@/features/auth/recoveryForm/RecoveryForm'
import styles from './NewPasswordPage.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { newPasswordSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import { authService } from '@/services/auth/authService'

type INewPassword = yup.InferType<typeof newPasswordSchema>

interface INewPasswordPage {
  code: string
}
const NewPasswordPage = ({ code }: INewPasswordPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<INewPassword>({ mode: 'onBlur', resolver: yupResolver(newPasswordSchema) })

  const {
    name: newPasswordName,
    onChange: onNewPasswordChange,
    onBlur: onNewPasswordBlur,
    ref: newPasswordRef,
  } = register('newPassword')

  const {
    name: passwordConfirmationName,
    onChange: onPasswordConfirmationChange,
    onBlur: onPasswordConfirmationBlur,
    ref: passwordConfirmationRef,
  } = register('passwordConfirmation')

  const { mutate: createNewPassword } = useMutation({
    mutationFn: authService.createNewPassword,
  })

  const onFormSubmit: SubmitHandler<INewPassword> = (data) => {
    data.newPassword && createNewPassword({ newPassword: data.newPassword, recoveryCode: code })
  }

  return (
    <div className={authStyles.authPage}>
      <RecoveryForm title="Create New Password">
        <form className={styles.formContainer} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.form_info}>
            <div className={styles.btn_group}>
              <div>
                <InputPassword
                  fieldName="New Password"
                  type="password"
                  name={newPasswordName}
                  onChange={onNewPasswordChange}
                  onBlur={onNewPasswordBlur}
                  ref={newPasswordRef}
                  error={errors.newPassword?.message ? errors.newPassword.message : ''}
                />
              </div>
              <div>
                <InputPassword
                  fieldName="Password Confirmation"
                  type="password"
                  name={passwordConfirmationName}
                  onChange={onPasswordConfirmationChange}
                  onBlur={onPasswordConfirmationBlur}
                  ref={passwordConfirmationRef}
                  error={errors.passwordConfirmation?.message ? errors.passwordConfirmation.message : ''}
                />
              </div>
            </div>
            <p>Your password must be between 6 and 20 characters</p>
          </div>
          <Button type="submit" disabled={!isValid && !isDirty}>
            Create new password
          </Button>
        </form>
      </RecoveryForm>
    </div>
  )
}

export default NewPasswordPage
