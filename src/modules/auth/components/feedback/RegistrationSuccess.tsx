import successImg from '@/../public/auth/bro.png'
import Feedback from '@/common/ui/feedback/Feedback'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

export const RegistrationSuccess = () => {
  const { push } = useRouter()

  const redirectToLogin = () => push(RouteNames.LOGIN)

  return (
    <Feedback
      title="Congratulations!"
      info="Your email has been confirmed"
      image={successImg}
      actionBtnTitle="Sign In"
      action={redirectToLogin}
    />
  )
}
