import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

type PaymentBtnsPropsType = {
  setPaymentSystem: (system: string) => void
  setShowPaymentPopup: (bool: boolean) => void
}

export const PaymentBtns = ({ setPaymentSystem, setShowPaymentPopup }: PaymentBtnsPropsType) => {
  const onBtnClickHandler = (system: string) => {
    setPaymentSystem(system)
    setShowPaymentPopup(true)
  }
  return (
    <div className={s.payment_btns}>
      <span style={{ cursor: 'pointer' }} onClick={() => onBtnClickHandler('PAYPAL')}>
        <IcomoonReact icon={'paypal-svgrepo-com-4'} iconSet={iconSet} size={85} />
      </span>
      <span>Or</span>
      <span style={{ cursor: 'pointer' }} onClick={() => onBtnClickHandler('STRIPE')}>
        <IcomoonReact icon={'stripe-svgrepo-com-4'} iconSet={iconSet} size={85} />
      </span>
    </div>
  )
}
