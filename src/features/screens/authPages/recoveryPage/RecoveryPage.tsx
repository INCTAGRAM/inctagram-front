import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import RecoveryForm from '@/features/auth/recoveryForm/RecoveryForm'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import AuthPopup from '@/features/auth/authPopup/AuthPopup'
import authStyles from '../authPages.module.scss'
import styles from './RecoveryPage.module.scss'

const RecoveryPage = () => {
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  const emailRef = useRef(null)

  const { mutate: sendEmail } = useMutation({
    mutationFn: authService.passwordRecovery,
    onSuccess: () => setIsShowPopup(true),
  })

  const clearEmailField = () => setEmail('')

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    email ? sendEmail(email) : emailRef.current.focus()
  }

  return (
    <div className={authStyles.authPage}>
      <RecoveryForm title="Forgot Password" subLink="/" subLinkTitle="Back to Sing In" clearFields={clearEmailField}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <div className={styles.form_info}>
            <InputText fieldName="email" ref={emailRef} value={email} onChange={onChangeEmail} />
            <p>Enter your email address and we will send you further instructions </p>
          </div>
          <Button type="submit">Send Instructions</Button>
        </form>
      </RecoveryForm>
      <AuthPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} clearEmail={clearEmailField} />
    </div>
  )
}

export default RecoveryPage
