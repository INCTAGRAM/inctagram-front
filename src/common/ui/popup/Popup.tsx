import React, { PropsWithChildren, ReactNode } from 'react'
import styles from './Popup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { IconButton } from '@mui/material'

interface IPopupProps {
  title?: string
  show: boolean
  modalOnClick?: () => void
  onclickContent?: string
  modalOnClickPrevStep?: () => void
  className?: string
  children?: ReactNode
}

export const Popup = ({
  show,
  modalOnClick,
  onclickContent,
  modalOnClickPrevStep,
  title,
  className,
  children,
}: PropsWithChildren<IPopupProps>) => {
  let finalPopupClassName = `${styles.popup_background} `
  finalPopupClassName += show ? `${styles.popup_open} ` : ''
  finalPopupClassName += className ? className : ''

  return (
    <div className={finalPopupClassName}>
      <div className={styles.popup}>
        <div className={styles.popup_header}>
          {modalOnClickPrevStep ? (
            <IconButton>
              <IcomoonReact
                className={styles.close_btn}
                iconSet={iconSet}
                color={'#fff'}
                icon="arrow-ios-back"
                size={25}
                onClick={modalOnClickPrevStep}
              />
            </IconButton>
          ) : (
            ''
          )}
          <p className={styles.title}>{title}</p>
          {onclickContent ? (
            <span className={styles.rightAction} onClick={modalOnClick}>
              {onclickContent}
            </span>
          ) : (
            <IconButton>
              <IcomoonReact
                className={styles.close_btn}
                iconSet={iconSet}
                color={'#fff'}
                icon="close"
                size={25}
                onClick={modalOnClick}
              />
            </IconButton>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
