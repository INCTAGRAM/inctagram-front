import { Popup } from '@/common/ui/popup/Popup'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import { Button } from '@mui/material'
import React from 'react'
import { PaymentType } from '@/modules/profileSettings/components/accountManagement/types/PaymentType'

type PaymentPopupPropsType = {
  paymentData: {
    count: number
    payments: PaymentType[]
  }
  priceId: string
  makeSubscription: any
  setShowPaymentPopup: (show: boolean) => void
  setPaymentSystem: (system: string) => void
  paymentSystem: string
  closePopup: () => void
  showPaymentPopup: boolean
}

export const PaymentPopup = ({
  showPaymentPopup,
  closePopup,
  paymentSystem,
  setPaymentSystem,
  setShowPaymentPopup,
  makeSubscription,
  priceId,
  paymentData,
}: PaymentPopupPropsType) => {
  return (
    <Popup show={showPaymentPopup} title={'Payment Method'} modalOnClick={closePopup}>
      <div className={s.popup_content}>
        <select
          value={paymentSystem}
          onChange={(e) => setPaymentSystem(e.currentTarget.value)}
          placeholder={'Choose a payment method'}
        >
          <option value={'STRIPE'}>Stripe</option>
          <option value={'PAYPAL'}>Paypal</option>
        </select>
        <Button
          onClick={() => {
            setShowPaymentPopup(false)
            makeSubscription({ priceId, renew: paymentData.count !== 0, paymentSystem })
          }}
        >
          Pay
        </Button>
      </div>
    </Popup>
  )
}
