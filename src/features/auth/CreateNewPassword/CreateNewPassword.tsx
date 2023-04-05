import React from 'react'
import style from './CreateNewPassword.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'

type Inputs = {
  NewPassword: string
  PasswordConfirmation: string
}
const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.NewPassword === data.PasswordConfirmation) {
      clearErrors()
      console.log(data)
    } else {
      setError('PasswordConfirmation', { type: 'custom', message: 'custom error' })
    }
  }

  return (
    <div className={style.authContainer}>
      <h2 className={style.title}>Create New Password</h2>

      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <InputPassword
          fieldName={'NewPassword'}
          type="password"
          {...register('NewPassword', {
            required: 'Поле обязательно',
            minLength: { value: 6, message: 'min 6' },
            maxLength: { value: 20, message: 'max 20' },
          })}
          error={errors.NewPassword?.message}
        />
        <div style={{ marginTop: 22 }}>
          <InputPassword
            fieldName={'PasswordConfirmation'}
            type="password"
            {...register('PasswordConfirmation', {
              required: 'Поле обязательно',
              minLength: { value: 6, message: 'min 6' },
              maxLength: { value: 20, message: 'max 20' },
            })}
            error={errors.PasswordConfirmation?.message}
          />
        </div>

        <p className={style.description}>Your password must be between 6 and 20 characters</p>

        <Button type="submit" disabled={!isValid} className={style.button}>
          {'Create new password'}
        </Button>
      </form>
    </div>
  )
}

export default CreateNewPassword
