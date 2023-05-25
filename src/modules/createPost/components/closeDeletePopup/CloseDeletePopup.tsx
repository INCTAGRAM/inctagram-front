import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'
import { Button } from '@/common/ui/button/Button'
import styles from './CloseDeletePopup.module.scss'

type CloseDeletePopupType = {
  show: boolean
  title?: string
  setIsShowCloseDeletePopup: (isShow: boolean) => void
  closeAndDeleteHandler: () => void
}

export const CloseDeletePopup = ({ show, setIsShowCloseDeletePopup, closeAndDeleteHandler }: CloseDeletePopupType) => {
  const closeHandler = () => {
    setIsShowCloseDeletePopup(false)
  }

  return (
    <Popup title="Close" show={show} modalOnClick={closeHandler}>
      <div className={styles.wrapperPopup}>
        <p className={styles.wrapperChildren}>
          Do you really want to close the creation of a publication? <br />
          If you close everything will be deleted
        </p>
        <div className={styles.wrapperButton}>
          <Button onClick={closeAndDeleteHandler} className={`${styles.button} ${styles.btnYes}`}>
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
