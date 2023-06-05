import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '../../../../../public/auth/expired-link.png'
import { useResendingConfirmationMutation } from '@/modules/auth/services/authService'

interface IExpiredPage {
  email: string
}

export const ExpiredPage = ({ email }: IExpiredPage) => {
  const [sendEmail] = useResendingConfirmationMutation()

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
    </>
  )
}
