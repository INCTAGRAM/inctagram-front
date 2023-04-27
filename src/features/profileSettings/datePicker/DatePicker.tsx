import React, { PropsWithChildren } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import s from './DatePicker.module.scss'
import { useController, UseFormRegister } from 'react-hook-form'
import { SetProfileType } from '@/features/screens/profileSettingsPage/ProfileSettingsPage'
import { DatePicker } from '@mui/x-date-pickers'
import { Control } from 'react-hook-form/dist/types/form'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/system'

interface IDatePickerProps {
  register: UseFormRegister<SetProfileType>
  control: Control<any>
  name: string
}

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          button: { color: '#fff' },
          span: { color: '#4C4C4C' },
          svg: { background: '#4C4C4C', borderRadius: '50%' },
          background: '#171717',
          border: '1px solid #333333',
          color: '#fff',
        },
      },
    },
  },
})

const MUIDatePicker = ({ register, control, name, ...props }: PropsWithChildren<IDatePickerProps>) => {
  const { field } = useController({ control, name })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DatePicker
          label={'Date of birthday'}
          format={'DD.MM.YYYY'}
          className={s.picker}
          {...props}
          {...field}
          onChange={(v) => field.onChange(v)}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}
export default MUIDatePicker
