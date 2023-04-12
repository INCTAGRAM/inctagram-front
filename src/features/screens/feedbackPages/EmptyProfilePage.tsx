import Feedback from '@/common/ui/feedback/Feedback'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

const EmptyProfilePage = () => {
  const { push } = useRouter()

  const redirectToCreateProfile = () => push(RouteNames.PROFILE_CREATE)

  return (
    <Feedback
      title="Oops! This place looks empty"
      info="You do not have an account to create one, click below and then fill in all the fields"
      actionBtnTitle="Create Account"
      action={redirectToCreateProfile}
    />
  )
}

export default EmptyProfilePage
