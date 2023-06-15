import * as React from 'react'
import { useGetPaymentsQuery } from '@/modules/profileSettings/services/profileSettings/profileSettingsService'
import { useState } from 'react'
import { fillTable } from '@/modules/profileSettings/helpers/fillTable'
import { MuiTable } from './table/Table'
import { NavigationPanel } from '@/modules/profileSettings/components/payments/components/navigationPanel/NavigationPanel'

export const Payments = () => {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const { data, isFetching } = useGetPaymentsQuery({ page, pageSize })

  const rows = fillTable(data)

  if (isFetching || !data) return null

  return (
    <div>
      <MuiTable rows={rows} />
      <NavigationPanel pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} count={data.count} />
    </div>
  )
}
