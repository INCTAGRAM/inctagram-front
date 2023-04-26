import React, { useState } from 'react'
import { ErrorOption, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { recoverySchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/authService'
import Form from '@/features/form/Form'
import { RouteNames } from '@/constants/routes'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import EmailSendPopup from '@/features/popups/emailSendPopup/EmailSendPopup'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios'

type RecoveryType = yup.InferType<typeof recoverySchema>

const ConfirmationErrorPage = () => {
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    reset,
  } = useForm<RecoveryType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoverySchema),
  })

  const {
    mutate: sendEmail,
    isError,
    error,
  } = useMutation({
    mutationFn: authService.resendingConfirmation,
    onSuccess: () => setIsShowPopup(true),
    onError: (error: ErrorOption) => setError('email', error),
  })

  const onFormSubmit: SubmitHandler<RecoveryType> = ({ email }) => {
    if (!email) return

    sendEmail(email)
    setEmail(email)
    reset()
  }

  return (
    <>
      <Form
        title="Error, please enter email"
        onSubmit={handleSubmit(onFormSubmit)}
        redirect={{ link: RouteNames.REGISTER, linkTitle: 'Back to Sign Up' }}
      >
        <p>
          <InputText
            fieldName="email"
            autoComplete="off"
            error={errors.email?.message ? errors.email.message : ''}
            {...register('email')}
          />
        </p>
        <p>
          An error occurred while registering, please re-enter your email address and we will send you further
          instructions
        </p>
        <Button type="submit" disabled={!isValid && !isDirty}>
          Send Instructions
        </Button>
      </Form>
      <EmailSendPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
      {isError && <AlertSnackbar type={'error'} message={errorHandler(error as AxiosError)} />}
    </>
  )
}

export default ConfirmationErrorPage
