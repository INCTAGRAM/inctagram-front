import authStyles from '../authPages.module.scss'
import Feedback from '@/features/auth/feedback/Feedback'
import expiredImg from '@/assets/images/auth/expired-link.png'
import { useRouter } from 'next/router'

const ExpiredPages = () => {
  const { push } = useRouter()

  const redirectInRecovery = () => push('/auth/recovery')

  return (
    <div className={authStyles.authPage}>
      <Feedback
        title="Email verification link expired"
        info="Looks like the verification link has expired. Not to worry, we can send the link again"
        image={expiredImg}
        actionBtnTitle="Resend verification link"
        action={redirectInRecovery}
      />
    </div>
  )
}

export default ExpiredPages
