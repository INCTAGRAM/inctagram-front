import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
import React from 'react'
import { PriceList } from './priceList/PriceList'
import { PriceListItemType } from '@/modules/profileSettings/types/PriceListItemType'
import { PaymentType } from '@/modules/profileSettings/types/PaymentType'

type SubscriptionPricesPropsType = {
  setPriceId: (priceId: string) => void
  priceId: string
  priceList: PriceListItemType[]
  payments: PaymentType[]
}

export const SubscriptionPrices = ({ priceList, priceId, setPriceId, payments }: SubscriptionPricesPropsType) => {
  return (
    <div className={s.container_item}>
      <h2>{payments.length === 0 ? 'Your subscription costs' : 'Change your subscription'}</h2>
      <PriceList priceList={priceList} priceId={priceId} setPriceId={setPriceId} />
    </div>
  )
}
