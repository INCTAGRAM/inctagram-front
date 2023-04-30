import React, { PropsWithChildren } from 'react'
import styles from './Popup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { IconButton } from '@mui/material'

interface IPopupProps {
  photoPopup?: boolean
  title?: string
  show: boolean
  modalOnClick?: () => void
  className?: string
  setBackOnClick?: () => void
  setNextOnClick?: () => void
}

export const Popup = ({
  show,
  modalOnClick,
  title,
  className,
  photoPopup,
  children,
  setBackOnClick,
  setNextOnClick,
}: PropsWithChildren<IPopupProps>) => {
  let finalPopupClassName = `${styles.popup_background} `
  finalPopupClassName += show ? `${styles.popup_open} ` : ''
  finalPopupClassName += className ? className : ''
  return (
    <div className={finalPopupClassName}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup_header}>
          {photoPopup && (
            <IconButton sx={{ color: 'white' }} onClick={setBackOnClick}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <p className={styles.title}>{title}</p>
          {photoPopup ? (
            <IconButton className={styles.popup_button_next} onClick={setNextOnClick}>
              Next
            </IconButton>
          ) : (
            <IcomoonReact
              className={styles.close_btn}
              iconSet={iconSet}
              icon="close"
              size={25}
              onClick={modalOnClick}
            />
          )}
        </div>
        <div className={!photoPopup ? styles.popup_body : ''}>{children}</div>
      </div>
    </div>
  )
}
