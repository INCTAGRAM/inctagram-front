import React, { useEffect, useState } from 'react'
import s from './AccountManagement.module.scss'
import {
  useGetPaymentsQuery,
  useGetPriceListQuery,
  useMakeSubscriptionMutation,
} from '../services/profileSettingsService'
import { PaymentPopup } from '@/modules/profileSettings/components/accountManagement/components/paymentPopup/PaymentPopup'
import { ErrorPopup } from '@/modules/profileSettings/components/accountManagement/components/errorPopup/ErrorPopup'
import { SuccessPopup } from '@/modules/profileSettings/components/accountManagement/components/successPopup/SuccessPopup'
import { Subscriptions } from '@/modules/profileSettings/components/accountManagement/components/subscriptions/Subscriptions'
import { AccountTypes } from '@/modules/profileSettings/components/accountManagement/components/accounts/Accounts'
import { SubscriptionPrices } from '@/modules/profileSettings/components/accountManagement/components/prices/Prices'

export const AccountManagement = () => {
  const [makeSubscription, { data: paymentUrl, isError }] = useMakeSubscriptionMutation()
  const { data: priceList, isFetching } = useGetPriceListQuery()
  const { data: paymentData, isFetching: isPaymentFetching } = useGetPaymentsQuery({ page: 1, pageSize: 10 })

  const [accountType, setAccountType] = useState('Personal')
  const [priceId, setPriceId] = useState('')
  const [paymentSystem, setPaymentSystem] = useState('')
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)

  useEffect(() => {
    priceList && setPriceId(priceList[0].id)
  }, [isFetching])

  useEffect(() => {
    if (paymentUrl) window.location.href = paymentUrl
  }, [paymentUrl])

  useEffect(() => {
    if (isError) setShowErrorPopup(true)
  }, [isError])

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const closeErrorPopup = () => setShowErrorPopup(false)
  const closeSuccessPopup = () => setShowSuccessPopup(false)
  const closePopup = () => setShowPaymentPopup(false)

  if (isFetching || isPaymentFetching || paymentData === undefined) return null

  return (
    <div className={s.container}>
      {paymentData.count !== 0 && <Subscriptions payments={paymentData.payments} />}
      <AccountTypes setAccountType={setAccountType} accountType={accountType} />
      {accountType === 'Business' && (
        <SubscriptionPrices
          priceId={priceId}
          setPriceId={setPriceId}
          priceList={priceList!}
          setPaymentSystem={setPaymentSystem}
          setShowPaymentPopup={setShowPaymentPopup}
        />
      )}
      <PaymentPopup
        setShowPaymentPopup={setShowPaymentPopup}
        showPaymentPopup={showPaymentPopup}
        paymentData={paymentData}
        paymentSystem={paymentSystem}
        setPaymentSystem={setPaymentSystem}
        closePopup={closePopup}
        priceId={priceId}
        makeSubscription={makeSubscription}
      />
      <ErrorPopup closeErrorPopup={closeErrorPopup} showErrorPopup={showErrorPopup} />
      <SuccessPopup closeSuccessPopup={closeSuccessPopup} showSuccessPopup={showSuccessPopup} />
    </div>
  )
}
