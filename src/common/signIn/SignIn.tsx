import React from 'react'
import IcomoonReact from 'icomoon-react'
import iconSet from '../../assets/icons/selection.json'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import Link from 'next/link'
import { Button } from '@/common/ui/button/Button'
import s from './SignIn.module.scss'
import { Form } from '@/common/ui/Form/Form'
import { useForm } from 'react-hook-form'
import { QueryClient, useMutation } from 'react-query'
import axios from 'axios'
import { object, string } from 'yup'

//type SignInProps = {}
export type FormType = {
  email: string
  password: string
}

const SignIn = () => {
  const client = new QueryClient()

  const { mutate: login } = useMutation({
    mutationFn: (body) => axios.post('api/auth/login', body),
    onSuccess: (user) => {
      client.setQueriesData(['login'], () => {
        return user
      })
    },
  })
  const onSubmit = (data: FormType) => {
    //login(data)
    console.log(data)
  }
  const schema = object().shape({
    email: string().required().email(),
    password: string().required().min(6).max(20),
  })
  return (
    <div className={s.page}>
      <div className={s.main}>
        <div className={s.title}>Sign in</div>
        <div className={s.icons_container}>
          <IcomoonReact className={s.icon} icon={'google-svgrepo-com-1'} iconSet={iconSet} size={70} />
          <IcomoonReact className={s.icon} icon={'facebook-svgrepo-com-1-1'} iconSet={iconSet} size={70} />
        </div>
        <Form<FormType> onSubmit={onSubmit} classname={s.form_class} schema={schema}>
          {({ register, formState: { errors, touchedFields } }) => (
            <>
              <InputText className={s.input} {...register('email')} />
              {errors.email && touchedFields.email && <div className={s.error}>{errors.email.message}</div>}
              <InputPassword className={s.input} {...register('password')} />
              {errors.password && touchedFields.password && <div className={s.error}>{errors.password.message}</div>}
              <Button type={'submit'} className={s.sign_in_btn}>
                Sign in
              </Button>
            </>
          )}
        </Form>
        <div className={s.forgot_pass_row}>
          <Link href={'/forgot_password'} className={s.forgot_pass_link}>
            Forgot password
          </Link>
        </div>

        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span className={s.inscription}>Don't have an account?</span>
        <span>
          <Link href={'/signup'} className={s.sign_up_btn}>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  )
}

export default SignIn
