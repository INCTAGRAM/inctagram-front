import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

type PaymentBtnsPropsType = {
  priceId: string
  makeSubscription: any // Зачем прокидывать?
  count: number
}

export const PaymentBtns = ({ makeSubscription, priceId, count }: PaymentBtnsPropsType) => {
  const onBtnClickHandler = (system: string) => {
    makeSubscription({ priceId, renew: count !== 0, paymentSystem: system })
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
