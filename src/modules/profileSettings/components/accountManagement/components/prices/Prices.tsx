import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import { PaymentBtns } from '@/modules/profileSettings/components/accountManagement/components/paymentBtns/PaymentBtns'
import React from 'react'
import { PriceList } from './priceList/PriceList'
import { PriceListItemType } from '@/modules/profileSettings/components/accountManagement/types/PriceListItemType'

type SubscriptionPricesPropsType = {
  setShowPaymentPopup: (show: boolean) => void
  setPaymentSystem: (system: string) => void
  setPriceId: (priceId: string) => void
  priceId: string
  priceList: PriceListItemType[]
}

export const SubscriptionPrices = ({
  priceList,
  priceId,
  setPriceId,
  setPaymentSystem,
  setShowPaymentPopup,
}: SubscriptionPricesPropsType) => {
  return (
    <div className={s.container_item}>
      <h2>Your subscription costs</h2>
      <PriceList priceList={priceList} priceId={priceId} setPriceId={setPriceId} />
      <PaymentBtns setPaymentSystem={setPaymentSystem} setShowPaymentPopup={setShowPaymentPopup} />
    </div>
  )
}
