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
  const LoginSchema = object().shape({
    email: string().email('Invalid email').required('Required'),
    password: string().required('Required'),
  })
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
    login(data)
  }

  return (
    <div className={s.page}>
      <div className={s.main}>
        <div className={s.title}>Sign in</div>
        <div className={s.icons_container}>
          <IcomoonReact className={s.icon} icon={'google-svgrepo-com-1'} iconSet={iconSet} size={70} />
          <IcomoonReact className={s.icon} icon={'facebook-svgrepo-com-1-1'} iconSet={iconSet} size={70} />
        </div>
        <Form<FormType>
          onSubmit={onSubmit}
          //className={s.form_class}
        >
          {({ register }) => (
            <>
              <InputText {...register('email')} />
              <InputPassword {...register('password')} />
              <Button type={'submit'} className={s.sign_in_btn}>
                Sign in
              </Button>
            </>
          )}
        </Form>
        <div>
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
