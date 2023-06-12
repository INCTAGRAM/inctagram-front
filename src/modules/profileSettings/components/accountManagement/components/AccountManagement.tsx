import React, { useEffect, useState } from 'react'
import s from './AccountManagement.module.scss'
import {
  useGetPaymentsQuery,
  useGetPriceListQuery,
  useMakeSubscriptionMutation,
} from '../services/profileSettingsService'
import { ErrorPopup } from '@/modules/profileSettings/components/accountManagement/components/errorPopup/ErrorPopup'
import { SuccessPopup } from '@/modules/profileSettings/components/accountManagement/components/successPopup/SuccessPopup'
import { Subscriptions } from '@/modules/profileSettings/components/accountManagement/components/subscriptions/Subscriptions'
import { AccountTypes } from '@/modules/profileSettings/components/accountManagement/components/accounts/Accounts'
import { SubscriptionPrices } from '@/modules/profileSettings/components/accountManagement/components/prices/Prices'
import { PaymentBtns } from '@/modules/profileSettings/components/accountManagement/components/paymentBtns/PaymentBtns'
import { useRouter } from 'next/router'

export const AccountManagement = () => {
  const [makeSubscription, { data: paymentUrl, isError }] = useMakeSubscriptionMutation()
  const { data: priceList, isFetching } = useGetPriceListQuery()
  const { data: paymentData, isFetching: isPaymentFetching } = useGetPaymentsQuery({ page: 1, pageSize: 10 })

  const { query } = useRouter()

  const [accountType, setAccountType] = useState(paymentData?.payments.length === 0 ? 'Personal' : 'Business')
  const [priceId, setPriceId] = useState('')

  useEffect(() => {
    priceList && setPriceId(priceList[0].id)
  }, [isFetching])

  useEffect(() => {
    if (paymentUrl) window.location.href = paymentUrl
  }, [paymentUrl])

  useEffect(() => {
    if (isError) setShowErrorPopup(true)
  }, [isError])

  const [showSuccessPopup, setShowSuccessPopup] = useState(query.success === 'true')
  const [showErrorPopup, setShowErrorPopup] = useState(query.success === 'false')
  const closeErrorPopup = () => setShowErrorPopup(false)
  const closeSuccessPopup = () => setShowSuccessPopup(false)

  console.log(accountType)

  if (isFetching || isPaymentFetching || paymentData === undefined) return null

  return (
    <div className={s.container}>
      {paymentData.count !== 0 && <Subscriptions payments={paymentData.payments} />}
      <AccountTypes setAccountType={setAccountType} accountType={accountType} />
      {accountType === 'Business' && (
        <div>
          <SubscriptionPrices
            priceId={priceId}
            setPriceId={setPriceId}
            priceList={priceList!}
            payments={paymentData.payments}
          />
          <PaymentBtns count={paymentData.count} priceId={priceId} makeSubscription={makeSubscription} />
        </div>
      )}

      <ErrorPopup closeErrorPopup={closeErrorPopup} showErrorPopup={showErrorPopup} />
      <SuccessPopup closeSuccessPopup={closeSuccessPopup} showSuccessPopup={showSuccessPopup} />
    </div>
  )
}
