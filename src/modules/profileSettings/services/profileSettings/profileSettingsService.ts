import { IGetPaymentsRequestParams, IGetPaymentsResponse, IMakeSubscriptionRequestBody } from './types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'
import { PriceListItemType } from '@/modules/profileSettings/types/PriceListItemType'

export const profileSettingsService = createApi({
  reducerPath: 'profileSettingsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    makeSubscription: build.mutation<string, IMakeSubscriptionRequestBody>({
      query: (body) => ({
        url: '/subscriptions/checkout-session',
        responseHandler: (response) => response.text(),
        method: 'POST',
        body,
      }),
    }),
    getPriceList: build.query<PriceListItemType[], void>({
      query: () => ({
        url: 'subscriptions/price-list',
      }),
    }),
    getPayments: build.query<IGetPaymentsResponse, IGetPaymentsRequestParams>({
      query: (params) => ({
        url: 'subscriptions/payments',
        params,
      }),
    }),
  }),
})

export const { useMakeSubscriptionMutation, useGetPriceListQuery, useGetPaymentsQuery } = profileSettingsService
