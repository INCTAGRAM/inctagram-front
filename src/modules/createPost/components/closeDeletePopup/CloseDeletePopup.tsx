import { Popup } from '@/common/ui/popup/Popup'
import React, { ReactNode, useState } from 'react'
import { Button } from '@/common/ui/button/Button'
import style from './CloseDeletePopup.module.scss'

type CloseDeletePopupType = {
  show: boolean
  title?: string
  modalOnClick?: () => void
  children?: ReactNode
}
export const CloseDeletePopup = ({
  show,
  modalOnClick,
  children = <>Do you really want to close the creation of a publication? If you close everything will be deleted</>,
}: CloseDeletePopupType) => {
  const [yes, setYes] = useState(false)

  const onStyle = {
    backgroundColor: yes ? '#1976d2' : '#4C4C4C',
    color: yes ? 'white' : '#1976d2',
  }
  const offStyle = {
    backgroundColor: yes ? '#4C4C4C' : '#1976d2',
    color: yes ? '#1976d2' : 'white',
    border: yes ? '1px solid #1976d2' : '1px solid #1976d2',
  }
  const getActive = () => {
    setYes(true)
  }
  const getUnActive = () => {
    setYes(false)
  }

  return (
    <div className={style.wrapperPopup}>
      <Popup title="Close" show={show} modalOnClick={modalOnClick}>
        <div className={style.wrapperChildren}>{children}</div>
        <div className={style.wrapperButton}>
          <Button
            onClick={() => {
              getActive()
            }}
            style={onStyle}
            className={style.button}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              getUnActive()
            }}
            style={offStyle}
            className={style.button}
          >
            No
          </Button>
        </div>
      </Popup>
    </div>
  )
}
