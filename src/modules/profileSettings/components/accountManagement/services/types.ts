import { PaymentType } from '../../../types/PaymentType'

export interface IMakeSubscriptionRequestBody {
  priceId: string
  renew: boolean
  paymentSystem: string
}

export interface IGetPaymentsRequestParams {
  page: number
  pageSize: number
}

export interface IGetPaymentsResponse {
  count: number
  payments: PaymentType[]
}
