import Feedback from '@/common/ui/feedback/Feedback'
import expiredImg from '../../../../../public/auth/expired-link.png'
import { useResendingConfirmationMutation } from '@/modules/auth/services/authService'
import { EmailSendPopup } from '@/modules/auth'
import React, { useEffect, useState } from 'react'

interface IExpiredPage {
  email: string
}

export const Expired = ({ email }: IExpiredPage) => {
  const [sendEmail, { isSuccess }] = useResendingConfirmationMutation()
  const [isShowPopup, setIsShowPopup] = useState(false)

  useEffect(() => {
    isSuccess && setIsShowPopup(true)
  }, [isSuccess])

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
      <EmailSendPopup email={email} isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </>
  )
}
