import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import React from 'react'
import { SubscriptionList } from './subscriptionList/SubscriptionList'
import { PaymentType } from '@/modules/profileSettings/components/accountManagement/types/PaymentType'

type SubscriptionsPropsType = {
  payments: PaymentType[]
}

export const Subscriptions = ({ payments }: SubscriptionsPropsType) => {
  return (
    <div className={s.container_item}>
      <h2>Current Subscriptions</h2>
      <SubscriptionList payments={payments} />
    </div>
  )
}
