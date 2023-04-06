import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/authService'
import RecoveryForm from '@/features/auth/recoveryForm/RecoveryForm'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import AuthPopup from '@/features/auth/authPopup/AuthPopup'
import authStyles from '../authPages.module.scss'
import styles from './RecoveryPage.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { recoverySchema } from '@/validations/auth-schemes'

type IRecovery = yup.InferType<typeof recoverySchema>

const RecoveryPage = () => {
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    reset,
  } = useForm<IRecovery>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoverySchema),
  })

  const { name, onChange, onBlur, ref } = register('email')

  const { mutate: sendEmail } = useMutation({
    mutationFn: authService.passwordRecovery,
    onSuccess: () => setIsShowPopup(true),
    onError: (error) => setError('email', error),
  })

  const onFormSubmit: SubmitHandler<IRecovery> = (data) => {
    if (!data.email) return

    sendEmail(data.email)
    setEmail(data.email)
    reset()
  }

  return (
    <div className={authStyles.authPage}>
      <RecoveryForm title="Forgot Password" subLink="/" subLinkTitle="Back to Sing In">
        <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.form_info}>
            <InputText
              fieldName="email"
              autoComplete="off"
              error={errors.email?.message ? errors.email.message : ''}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
            <p>Enter your email address and we will send you further instructions</p>
          </div>
          <Button type="submit" disabled={!isValid && !isDirty}>
            Send Instructions
          </Button>
        </form>
      </RecoveryForm>
      <AuthPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </div>
  )
}

export default RecoveryPage
