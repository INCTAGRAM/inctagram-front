import s from '@/modules/profileSettings/components/payments/components/Payments.module.scss'
import { Pagination } from '@mui/material'
import * as React from 'react'
import { makeStyles } from '@mui/styles'

type NavigationPanelPropsType = {
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (page: number) => void
  count: number
}

export const NavigationPanel = ({ setPageSize, setPage, pageSize, count }: NavigationPanelPropsType) => {
  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#FFFFFF',
      },
      '& .Mui-selected': {
        background: '#FFFFFF',
        color: '#000000',
      },
      '& .Mui-selected:hover': {
        background: '#FFFFFF',
        color: '#000000',
      },
    },
  }))
  const classes = useStyles()

  if (!count) return null

  return (
    <div>
      <div className={s.footer}>
        <Pagination onChange={(e, v) => setPage(v)} classes={{ ul: classes.ul }} count={count} shape="rounded" />
        <div>
          <span>Show</span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.currentTarget.value))}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>on page</span>
        </div>
      </div>
    </div>
  )
}
