import style from './Registration.module.css'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputSchema } from '@/hooks/inputValidation'
import { Button } from '@/common/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { authAPI } from '@/api/auth'
import { useState } from 'react'
import AuthPopup from '@/features/auth/authPopup/AuthPopup'

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(inputSchema) })

  const { mutate: registration } = useMutation({
    mutationFn: authAPI.registration,
    onSuccess: () => setIsShowPopup(true),
  })

  const onSubmit: SubmitHandler<RegistrationValuesType> = (values) => {
    registration(values)
    setEmail(values.email)
    reset()
  }

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <p>
          <InputText
            fieldName={'Email'}
            autoComplete="off"
            {...register('email')}
            error={errors.email?.message && errors.email.message}
          />
        </p>
        <p>
          <InputPassword
            fieldName={'Password'}
            autoComplete="off"
            {...register('password')}
            error={errors.password?.message && errors.password.message}
          />
        </p>
        <p>
          <InputPassword
            fieldName={'Password confirmation'}
            autoComplete="off"
            {...register('passwordConfirmation')}
            error={errors.passwordConfirmation?.message && errors.passwordConfirmation.message}
          />
        </p>
        <Button type={'submit'}>Sign Up</Button>
      </form>
      <AuthPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </div>
  )
}

type RegistrationValuesType = {
  email: string
  password: string
  passwordConfirmation: string
}
