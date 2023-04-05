import React from 'react'
import styles from './Popup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

interface IPopupProps {
  title?: string
  show: boolean
  modalOnClick?: () => void
}

export const Popup = ({ show, modalOnClick, title, children }: IPopupProps) => {
  const finalPopupClassName = show ? `${styles.popup_background} ${styles.popup_open}` : `${styles.popup_background}`

  return (
    <div className={finalPopupClassName}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup_header}>
          <h1>{title}</h1>
          <IcomoonReact className={styles.close_btn} iconSet={iconSet} icon="close" size={25} onClick={modalOnClick} />
        </div>
        <div className={styles.popup_body}>{children}</div>
      </div>
    </div>
  )
}

export default Popup
