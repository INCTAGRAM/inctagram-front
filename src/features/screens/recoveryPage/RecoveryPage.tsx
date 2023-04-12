import { useState } from 'react'
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

type RecoveryType = yup.InferType<typeof recoverySchema>

const RecoveryPage = () => {
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

  const { mutate: sendEmail } = useMutation({
    mutationFn: authService.passwordRecovery,
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
        title="Forgot Password"
        onSubmit={handleSubmit(onFormSubmit)}
        redirect={{ link: RouteNames.LOGIN, linkTitle: 'Back to Sign In' }}
        isTopPanel={true}
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
    </>
  )
}

export default RecoveryPage
