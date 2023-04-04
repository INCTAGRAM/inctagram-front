import React, { FormEvent, useRef } from 'react'
import { NextPage } from 'next'
import RecoveryForm from '@/features/authForm/recoveryForm/RecoveryForm'
import styles from './recovery.module.scss'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'

const Index: NextPage = () => {
  const emailRef = useRef(null)

  const { mutate: sendEmail } = useMutation({
    mutationFn: (email: string) => authService.passwordRecovery(email),
  })

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailRef.current.value) sendEmail(emailRef.current.value)
    else emailRef.current.focus()
  }

  return (
    <div className={styles.authPage}>
      <RecoveryForm
        title="Forgot Password"
        subtitle="Enter your email address and we will send you further instructions"
        subLink="/"
        subLinkTitle="Back to Sing In"
      >
        <form onSubmit={onFormSubmit}>
          <div className={styles.form_info}>
            <InputText fieldName="email" ref={emailRef} />
            <p>Enter your email address and we will send you further instructions </p>
          </div>
          <Button type="submit">Send Instructions</Button>
        </form>
      </RecoveryForm>
    </div>
  )
}

export default Index
