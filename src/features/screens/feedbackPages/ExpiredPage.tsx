import screenStyles from '../screens.module.scss'
import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '@/assets/images/auth/expired-link.png'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

const ExpiredPage = () => {
  const { push } = useRouter()

  const redirectToRecovery = () => push(RouteNames.RECOVERY_EXPIRED)

  return (
    <div className={screenStyles.content_center}>
      <Feedback
        title="Email verification link expired"
        info="Looks like the verification link has expired. Not to worry, we can send the link again"
        image={expiredImg}
        actionBtnTitle="Resend verification link"
        action={redirectToRecovery}
      />
    </div>
  )
}

export default ExpiredPage
