import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
export const SubscriptionList = ({ payments }: SubscriptionListPropsType) => {
  return (
    <div className={s.block} style={{ height: `${84 + 38 * (payments.length - 1)}px` }}>
      <div className={s.payment_row}>
        <span>Date of payment</span>
        <span className={s.second_column_title}>End date of subscription</span>
      </div>
      {payments.map(({ endDate, paymentDate }, i) => {
        endDate = endDate.split('T')[0].replace(/-/g, '.')
        paymentDate = paymentDate.split('T')[0].replace(/-/g, '.')
        return (
          <div className={s.payment_row} style={{ gap: '69px', fontWeight: '600' }} key={i}>
            <span>{paymentDate}</span>
            <span>{endDate}</span>
          </div>
        )
      })}
    </div>
  )
}

import { PaymentType } from '@/modules/profileSettings/types/PaymentType'

type SubscriptionListPropsType = {
  payments: PaymentType[]
}
