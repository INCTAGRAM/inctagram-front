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
}

export const Popup = ({ show, modalOnClick, title, photoPopup, children }: PropsWithChildren<IPopupProps>) => {
  const finalPopupClassName = show ? `${styles.popup_background} ${styles.popup_open}` : `${styles.popup_background}`

  return (
    <div className={finalPopupClassName}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup_header}>
          {photoPopup && (
            <IconButton sx={{ color: 'white' }}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <h1>{title}</h1>
          {photoPopup ? (
            <IconButton className={styles.popup_button_next}>Next</IconButton>
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

export default Popup
