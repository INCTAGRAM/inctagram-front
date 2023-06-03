import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'

type ErrorPopupPropsType = {
  closeErrorPopup: () => void
  showErrorPopup: boolean
}

export const ErrorPopup = ({ closeErrorPopup, showErrorPopup }: ErrorPopupPropsType) => {
  return (
    <Popup show={showErrorPopup} modalOnClick={closeErrorPopup} title={'Error'}>
      Transaction failed, please try again
    </Popup>
  )
}
