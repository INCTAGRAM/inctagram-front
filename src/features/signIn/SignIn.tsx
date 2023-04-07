import React, { useEffect } from 'react'
import IcomoonReact from 'icomoon-react'
import iconSet from '../../assets/icons/selection.json'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import Link from 'next/link'
import { Button } from '@/common/ui/button/Button'
import s from './SignIn.module.scss'
import { Form } from '@/common/ui/Form/Form'
import { useLoginMutation } from '@/services/login/hooks'
import { useRouter } from 'next/navigation'
import { schema } from '@/features/signIn/validation'

export type FormType = {
  email: string
  password: string
}

const SignIn = () => {
  const { mutate: login, isLoading, isSuccess, error } = useLoginMutation()
  const router = useRouter()
  const errMessage = error && error.response.data.message[0]

  const onSubmit = (data: FormType) => {
    login(data)
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/')
    }
  }, [isSuccess, router])

  return (
    <>
      {isLoading && (
        <div style={{ color: 'red', position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>Loading....</div>
      )}
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
                <InputText className={s.input} {...register('email')} label={'Email'} placeholder={'Email'} />
                {errors.email && touchedFields.email && <div className={s.error}>{errors.email.message}</div>}
                <InputPassword
                  className={s.input}
                  {...register('password')}
                  label={'Password'}
                  placeholder={'Password'}
                />
                {errors.password && touchedFields.password && <div className={s.error}>{errors.password.message}</div>}
                {errMessage && <div className={s.error}>{errMessage}</div>}
                <Button type={'submit'} className={s.sign_in_btn}>
                  Sign in
                </Button>
              </>
            )}
          </Form>
          <div className={s.forgot_pass_row}>
            <Link href={'/auth/recovery'} className={s.forgot_pass_link}>
              Forgot password
            </Link>
          </div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span className={s.inscription}>Don't have an account?</span>
          <span>
            <Link href={'/auth/signUp'} className={s.sign_up_btn}>
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default SignIn
