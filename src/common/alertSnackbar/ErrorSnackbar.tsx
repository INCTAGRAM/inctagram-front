import { forwardRef, SyntheticEvent, useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { IErrorResponse } from '@/services/auth/types'

interface IAlertSnackbar {
  error: string | IErrorResponse | undefined
  time?: number
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar({ error, time }: IAlertSnackbar) {
  const [open, setOpen] = useState(true)
  let message

  if (typeof error === 'string') {
    message = error
  } else if (error?.data) {
    message = error.data.message[0]
  } else {
    message = 'Unknown error'
  }

  const handleClose = (event: Event | SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={time ? time : 6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
