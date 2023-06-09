import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { RowType } from '@/modules/profileSettings/components/payments/types/rowType'

type TablePropsType = {
  rows: RowType[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  border: '1px solid #171717',
}))

export const MuiTable = ({ rows }: TablePropsType) => {
  debugger
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Date of Payment</StyledTableCell>
            <StyledTableCell>Date end of subscription</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Subscription Type</StyledTableCell>
            <StyledTableCell>Payment Type</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell>{row.paymentDate}</StyledTableCell>
              <StyledTableCell>{row.endDate}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.subscriptionDuration}</StyledTableCell>
              <StyledTableCell>{row.provider}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
