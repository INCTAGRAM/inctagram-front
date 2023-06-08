import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import { PaymentType } from '@/modules/profileSettings/components/accountManagement/types/PaymentType'

type SubscriptionListPropsType = {
  payments: PaymentType[]
}

export const SubscriptionList = ({ payments }: SubscriptionListPropsType) => {
  return (
    <div className={s.block} style={{ height: `${84 + 38 * (payments.length - 1)}px` }}>
      <div className={s.payment_row} style={{ gap: '32px' }}>
        <span>Date of payment</span>
        <span className={s.second_column_title}>End date of subscription</span>
      </div>
      {payments.map((p, i) => (
        <div className={s.payment_row} style={{ gap: '69px', fontWeight: '600' }} key={i}>
          <span>{p.paymentDate}</span>
          <span>{p.endDate}</span>
        </div>
      ))}
    </div>
  )
}
