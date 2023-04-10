import screenStyles from '../screens.module.scss'
import successImg from '@/assets/images/auth/bro.png'
import Feedback from '@/common/ui/feedback/Feedback'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

const RegistrationSuccessPage = () => {
  const { push } = useRouter()

  const redirectToLogin = () => push(RouteNames.LOGIN)

  return (
    <div className={screenStyles.content_center}>
      <Feedback
        title="Congratulations!"
        info="Your email has been confirmed"
        image={successImg}
        actionBtnTitle="Sign In"
        action={redirectToLogin}
      />
    </div>
  )
}

export default RegistrationSuccessPage
