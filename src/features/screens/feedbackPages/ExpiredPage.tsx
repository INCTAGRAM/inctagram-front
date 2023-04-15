import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '../../../../public/auth/expired-link.png'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

const ExpiredPage = () => {
  const { push } = useRouter()

  const redirectToRecovery = () => push(RouteNames.RECOVERY_EXPIRED)

  return (
    <Feedback
      title="Email verification link expired"
      info="Looks like the verification link has expired. Not to worry, we can send the link again"
      image={expiredImg}
      actionBtnTitle="Resend verification link"
      action={redirectToRecovery}
    />
  )
}

export default ExpiredPage
