import React from 'react'
import styles from './AuthPopup.module.scss'
import { Button } from '@/common/ui/button/Button'
import Popup from '@/common/ui/popup/Popup'

interface IAuthPopup {
  email: string
  isShowPopup: boolean
  setIsShowPopup: (isShow: boolean) => void
}

const AuthPopup = ({ email, isShowPopup, setIsShowPopup }: IAuthPopup) => {
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

export default AuthPopup
