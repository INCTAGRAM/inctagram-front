import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'
import { Button } from '@/common/ui/button/Button'
import styles from './ConfirmActionPopup.module.scss'

type CloseDeletePopupType = {
  show: boolean
  title: string
  text: string
  confirmActionHandler: () => void
  closeActionHandler: () => void
  confirmTextButton?: string
  closeTextButton?: string
}

export const ConfirmActionPopup = ({
  show,
  title,
  text,
  closeActionHandler,
  confirmActionHandler,
  confirmTextButton,
  closeTextButton,
}: CloseDeletePopupType) => {
  return (
    <Popup title={title} show={show} modalOnClick={closeActionHandler}>
      <div className={styles.wrapperPopup}>
        <p className={styles.wrapperChildren}>{text}</p>
        <div className={styles.wrapperButton}>
          <Button onClick={confirmActionHandler} className={`${styles.button} ${styles.btnYes}`}>
            {confirmTextButton ? confirmTextButton : 'Yes'}
          </Button>
          <Button onClick={closeActionHandler} className={styles.button}>
            {closeTextButton ? closeTextButton : 'No'}
          </Button>
        </div>
      </div>
    </Popup>
  )
}
