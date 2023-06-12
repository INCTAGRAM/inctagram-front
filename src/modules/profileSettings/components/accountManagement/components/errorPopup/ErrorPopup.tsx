import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'
import { useRouter } from 'next/router'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'

type ErrorPopupPropsType = {
  closeErrorPopup: () => void
  showErrorPopup: boolean
}

export const ErrorPopup = ({ closeErrorPopup, showErrorPopup }: ErrorPopupPropsType) => {
  const { push } = useRouter()

  const modalOnClickHandler = () => {
    push('/profile/settings?section=account_management', '/profile/settings/account_management')
    closeErrorPopup()
  }

  return (
    <Popup show={showErrorPopup} modalOnClick={modalOnClickHandler} title={'Error'}>
      <div className={s.modal}>
        <span>Transaction failed, please try again</span>
        <button onClick={modalOnClickHandler}>Back to payment</button>
      </div>
    </Popup>
  )
}
