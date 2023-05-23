import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '../../../../../public/auth/expired-link.png'
import { useResendingConfirmationMutation } from '@/modules/auth/services/authService'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'

interface IExpiredPage {
  email: string
}

export const ExpiredPage = ({ email }: IExpiredPage) => {
  const [sendEmail, { isError, error }] = useResendingConfirmationMutation()

  const redirectToRecovery = () => {
    sendEmail({ email })
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
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}
