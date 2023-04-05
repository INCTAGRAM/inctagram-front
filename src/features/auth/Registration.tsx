import style from './Registration.module.css'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputSchema } from '@/hooks/inputValidation'
import { Button } from '@/common/ui/button/Button'

export const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(inputSchema) })

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <p>
          <InputText fieldName={'Email'} {...register('email')} />
        </p>
        <p>
          <InputPassword fieldName={'Password'} {...register('password')} />
        </p>
        <p>
          <InputPassword fieldName={'Password confirmation'} {...register('passwordConfirmation')} />
        </p>
        <Button type={'submit'}>Sign Up</Button>
      </form>
    </div>
  )
}
