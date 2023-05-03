import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '../../../../public/auth/expired-link.png'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/authService'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios'

interface IExpiredPage {
  email: string
}

const ExpiredPage = ({ email }: IExpiredPage) => {
  const {
    mutate: sendEmail,
    isError,
    error,
  } = useMutation({
    mutationFn: authService.resendingConfirmation,
  })

  const redirectToRecovery = () => {
    sendEmail(email)
  }

  return (
    <>
      <Feedback
        title="Email verification link expired"
        info="Looks like the verification link has expired. Not to worry, we can send the link again"
        image={expiredImg}
        actionBtnTitle="Resend verification link"
        action={redirectToRecovery}
      />
      {isError && <AlertSnackbar type={'error'} error={error as AxiosError} />}
    </>
  )
}

export default ExpiredPage
