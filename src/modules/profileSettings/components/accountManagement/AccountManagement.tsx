import React, { useEffect, useState } from 'react'
import s from './AccountManagement.module.scss'
import {
  useGetPaymentsQuery,
  useGetPriceListQuery,
  useMakeSubscriptionMutation,
} from '../../services/profileSettings/profileSettingsService'
import { ErrorPopup } from '@/modules/profileSettings/components/accountManagement/errorPopup/ErrorPopup'
import { SuccessPopup } from '@/modules/profileSettings/components/accountManagement/successPopup/SuccessPopup'
import { Subscriptions } from '@/modules/profileSettings/components/accountManagement/subscriptions/Subscriptions'
import { AccountTypes } from '@/modules/profileSettings/components/accountManagement/accounts/Accounts'
import { SubscriptionPrices } from '@/modules/profileSettings/components/accountManagement/prices/Prices'
import { PaymentBtns } from '@/modules/profileSettings/components/accountManagement/paymentBtns/PaymentBtns'
import { useRouter } from 'next/router'

export const AccountManagement = () => {
  const [makeSubscription, { data: paymentUrlData, isError }] = useMakeSubscriptionMutation()
  const { data: priceListData } = useGetPriceListQuery()
  const { data: paymentData } = useGetPaymentsQuery({ page: 1, pageSize: 10 })

  const { push, query } = useRouter()

  const [accountType, setAccountType] = useState(paymentData?.payments.length === 0 ? 'Personal' : 'Business')
  const [priceId, setPriceId] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(query.success === 'true')
  const [showErrorPopup, setShowErrorPopup] = useState(query.success === 'false')

  useEffect(() => {
    priceListData && setPriceId(priceListData[0].id)
  }, [priceListData])

  useEffect(() => {
    if (paymentUrlData) push(paymentUrlData)
  }, [paymentUrlData])

  useEffect(() => {
    if (isError) setShowErrorPopup(true)
  }, [isError])

  const closeErrorPopup = () => setShowErrorPopup(false)
  const closeSuccessPopup = () => setShowSuccessPopup(false)

  const paymentsBtnsHandler = (paymentSystem: string) => {
    makeSubscription({ priceId, renew: paymentData?.count !== 0, paymentSystem })
  }

  if (!priceListData || !paymentData) return null

  return (
    <div className={s.container}>
      {paymentData.count !== 0 && <Subscriptions payments={paymentData.payments} />}
      <AccountTypes setAccountType={setAccountType} accountType={accountType} />
      {accountType === 'Business' && (
        <div>
          <SubscriptionPrices
            priceId={priceId}
            setPriceId={setPriceId}
            priceList={priceListData}
            payments={paymentData.payments}
          />
          <PaymentBtns paymentsBtnsCallBack={paymentsBtnsHandler} />
        </div>
      )}

      <ErrorPopup closeErrorPopup={closeErrorPopup} showErrorPopup={showErrorPopup} />
      <SuccessPopup closeSuccessPopup={closeSuccessPopup} showSuccessPopup={showSuccessPopup} />
    </div>
  )
}
