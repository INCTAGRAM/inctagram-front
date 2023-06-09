import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'
import { Button } from '@/common/ui/button/Button'
import styles from './ConfirmActionPopup.module.scss'

type CloseDeletePopupType = {
  show: boolean
  title: string
  text: string
  setIsShowConfirmActionPopup: (isShow: boolean) => void
  confirmActionHandler: () => void
}

export const ConfirmActionPopup = ({
  show,
  title,
  text,
  setIsShowConfirmActionPopup,
  confirmActionHandler,
}: CloseDeletePopupType) => {
  const closeHandler = () => {
    setIsShowConfirmActionPopup(false)
  }

  return (
    <Popup title={title} show={show} modalOnClick={closeHandler}>
      <div className={styles.wrapperPopup}>
        <p className={styles.wrapperChildren}>{text}</p>
        <div className={styles.wrapperButton}>
          <Button onClick={confirmActionHandler} className={`${styles.button} ${styles.btnYes}`}>
            Yes
          </Button>
          <Button onClick={closeHandler} className={styles.button}>
            No
          </Button>
        </div>
      </div>
    </Popup>
  )
}
