import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'
import { useRouter } from 'next/router'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'

type SuccessPopupPropsType = {
  showSuccessPopup: boolean
  closeSuccessPopup: () => void
}

export const SuccessPopup = ({ closeSuccessPopup, showSuccessPopup }: SuccessPopupPropsType) => {
  const { push } = useRouter()

  const modalOnClickHandler = () => {
    push('/profile/settings?section=account_management', '/profile/settings/account_management')
    closeSuccessPopup()
  }

  return (
    <Popup show={showSuccessPopup} modalOnClick={modalOnClickHandler} title={'Success'}>
      <div className={s.modal}>
        <span>Payment was successful!</span>
        <button onClick={modalOnClickHandler}>OK</button>
      </div>
    </Popup>
  )
}
