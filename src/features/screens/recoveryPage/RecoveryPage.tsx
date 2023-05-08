import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/authService'
import { InputText } from '@/common/ui/inputText/InputText'
import { Button } from '@/common/ui/button/Button'
import EmailSendPopup from '@/features/popups/emailSendPopup/EmailSendPopup'
import { ErrorOption, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { recoverySchema } from '@/validations/auth-schemes'
import Form from '@/features/form/Form'
import { RouteNames } from '@/constants/routes'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { AxiosError } from 'axios'

type RecoveryType = yup.InferType<typeof recoverySchema>
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const RecoveryPage = () => {
  const [email, setEmail] = useState('')
  const [isShowPopup, setIsShowPopup] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

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
    mutationFn: authService.passwordRecovery,
    onSuccess: () => setIsShowPopup(true),
    onError: (error: ErrorOption) => setError('email', error),
  })

  const onFormSubmit: SubmitHandler<RecoveryType> = ({ email }) => {
    if (!email) return

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    executeRecaptcha('enquiryFormSubmit').then((recaptchaToken) => {
      sendEmail({ email: email, recaptchaToken: recaptchaToken })
      setEmail(email)
      reset()
    })
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
      {isError && <AlertSnackbar type={'error'} error={error as AxiosError} />}
    </>
  )
}

export default RecoveryPage

// this keys for recaptcha we dont use, but it have to work
// 6Lfoc-8lAAAAAASNlkyDs89G9ZGBrEGNmTJEwshp ---- Front
// 6Lfoc-8lAAAAAE0QWBXTrwcayEBKoA6VUA0mfjLR --- Bek
