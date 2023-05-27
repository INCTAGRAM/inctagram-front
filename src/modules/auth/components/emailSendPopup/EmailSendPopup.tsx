import React from 'react'
import styles from './EmailSendPopup.module.scss'
import { Button } from '@/common/ui/button/Button'
import { Popup } from '@/common/ui/popup/Popup'

interface IEmailSendPopup {
  email: string
  isShowPopup: boolean
  setIsShowPopup: (isShow: boolean) => void
}

export const EmailSendPopup = ({ email, isShowPopup, setIsShowPopup }: IEmailSendPopup) => {
  const closePopup = () => setIsShowPopup(false)

  return (
    <Popup title="Email sent" show={isShowPopup} modalOnClick={closePopup}>
      <div className={styles.popup_content}>
        <p>We have sent a link to confirm your email to {email}</p>
        <div>
          <Button onClick={closePopup}>OK</Button>
        </div>
      </div>
    </Popup>
  )
}
