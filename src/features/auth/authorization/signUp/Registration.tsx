import style from './Registration.module.css'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputSchema } from '@/hooks/inputValidation'
import { Button } from '@/common/ui/button/Button'
import { useMutation, useQuery } from 'react-query'
import { authAPI } from '@/api/auth'

export const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(inputSchema) })

  const { mutate: registration } = useMutation({
    mutationFn: authAPI.registration,
  })

  const onSubmit: SubmitHandler<RegistrationValuesType> = (values) => {
    registration(values)
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
    </div>
  )
}

type RegistrationValuesType = {
  email: string
  password: string
  passwordConfirmation: string
}
