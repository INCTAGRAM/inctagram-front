import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

type PaymentBtnsPropsType = {
  paymentsBtnsCallBack: (paymentSystem: string) => void
}

export const PaymentBtns = ({ paymentsBtnsCallBack }: PaymentBtnsPropsType) => {
  const onBtnClickHandler = (system: string) => {
    paymentsBtnsCallBack(system)
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
