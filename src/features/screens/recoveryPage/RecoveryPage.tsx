import React, { useState } from 'react'
import { usePasswordRecoveryMutation } from '@/services/auth/authService'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import EmailSendPopup from '@/features/popups/emailSendPopup/EmailSendPopup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { recoverySchema } from '@/validations/auth-schemes'
import Form from '@/features/form/Form'
import { RouteNames } from '@/constants/routes'
import { ErrorSnackbar } from '@/common/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'

type RecoveryType = yup.InferType<typeof recoverySchema>

const RecoveryPage = () => {
  const [sendEmail, { isError, error }] = usePasswordRecoveryMutation()
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<RecoveryType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoverySchema),
  })

  const onFormSubmit: SubmitHandler<RecoveryType> = ({ email }) => {
    if (!email) return

    sendEmail({ email })
    setEmail(email)
    reset()
  }

  return (
    <>
      <Form
        title="Forgot Password"
        onSubmit={handleSubmit(onFormSubmit)}
        redirect={{ link: RouteNames.LOGIN, linkTitle: 'Back to Sign In' }}
      >
        <p>
          <InputText
            fieldName="email"
            autoComplete="off"
            error={errors.email?.message ? errors.email.message : ''}
            {...register('email')}
          />
        </p>
        <p>Enter your email address and we will send you further instructions</p>
        <Button type="submit" disabled={!isValid && !isDirty}>
          Send Instructions
        </Button>
      </Form>
      <EmailSendPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}

export default RecoveryPage
