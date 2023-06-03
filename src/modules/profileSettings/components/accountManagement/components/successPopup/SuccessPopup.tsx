import { Popup } from '@/common/ui/popup/Popup'
import React from 'react'

type SuccessPopupPropsType = {
  showSuccessPopup: boolean
  closeSuccessPopup: () => void
}

export const SuccessPopup = ({ closeSuccessPopup, showSuccessPopup }: SuccessPopupPropsType) => {
  return (
    <Popup show={showSuccessPopup} modalOnClick={closeSuccessPopup} title={'Success'}>
      Payment was successful!
    </Popup>
  )
}
