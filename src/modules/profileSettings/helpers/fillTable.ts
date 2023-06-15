import { PaymentType } from '@/modules/profileSettings/types/PaymentType'
import { RowType } from '@/modules/profileSettings/types/rowType'

type dataType = {
  count: number
  payments: PaymentType[]
}

function createData(
  paymentDate: string,
  endDate: string,
  price: number,
  subscriptionDuration: string,
  provider: string
) {
  return { paymentDate, endDate, price, subscriptionDuration, provider }
}

export const fillTable = (data: dataType | undefined): RowType[] => {
  const rows: RowType[] = []

  if (!data) return rows
  for (let i = 0; i < data?.count; i++) {
    data && console.log(data?.count)
    if (data.payments.length === 0) return []
    const { price, period, periodType, provider } = data.payments[i]
    let { paymentDate, endDate } = data.payments[i]

    paymentDate = paymentDate.split('T')[0].replace(/-/g, '.')
    endDate = endDate.split('T')[0].replace(/-/g, '.')

    rows.push(createData(paymentDate, endDate, price, `${period} ${periodType}`, provider))
  }

  return rows
}
