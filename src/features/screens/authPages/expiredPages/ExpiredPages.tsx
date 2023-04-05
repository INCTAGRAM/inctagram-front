import authStyles from '../authPages.module.scss'
import Feedback from '@/features/auth/feedback/Feedback'
import expiredImg from '@/assets/images/auth/expired-link.png'

const ExpiredPages = () => {
  return (
    <div className={authStyles.authPage}>
      <Feedback
        title="Email verification link expired"
        info="Looks like the verification link has expired. Not to worry, we can send the link again"
        actionBtnTitle="Resend verification link"
        image={expiredImg.src}
      />
    </div>
  )
}

export default ExpiredPages
