import { forwardRef, SyntheticEvent, useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'

interface IAlertSnackbar {
  message: string
  time?: number
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function SuccessSnackbar({ message, time }: IAlertSnackbar) {
  const [open, setOpen] = useState(true)

  const handleClose = (event: Event | SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={time ? time : 6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
