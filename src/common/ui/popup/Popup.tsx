import React, { PropsWithChildren } from 'react'
import styles from './Popup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

interface IPopupProps {
  title?: string
  show: boolean
  modalOnClick?: () => void
  onclickContent?: string
  modalOnClickPrevStep?: () => void
  className?: string
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
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup_header}>
          {modalOnClickPrevStep ? (
            <IcomoonReact
              className={styles.close_btn}
              iconSet={iconSet}
              color={'#fff'}
              icon="arrow-ios-back"
              size={25}
              onClick={modalOnClickPrevStep}
            />
          ) : (
            ''
          )}
          <p className={styles.title}>{title}</p>
          {onclickContent ? (
            <span className={styles.rightAction} onClick={modalOnClick}>
              {onclickContent}
            </span>
          ) : (
            <IcomoonReact
              className={styles.close_btn}
              iconSet={iconSet}
              color={'#fff'}
              icon="close"
              size={25}
              onClick={modalOnClick}
            />
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
