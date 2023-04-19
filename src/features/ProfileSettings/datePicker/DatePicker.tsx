import React, { PropsWithChildren, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import s from './DatePicker.module.scss'
import { useController, UseFormRegister, Controller } from 'react-hook-form'
import { SetProfileType } from '@/features/screens/profileSettingsPage/ProfileSettingsPage'
import { DatePicker } from '@mui/x-date-pickers'
import { Control } from 'react-hook-form/dist/types/form'

interface IDatePickerProps {
  register: UseFormRegister<SetProfileType>
  control: Control<any>
  name: string
}

const MUIDatePicker = ({ register, control, name, ...props }: PropsWithChildren<IDatePickerProps>) => {
  const { field } = useController({ control, name })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={'Date of birthday'}
        format={'DD.MM.YYYY'}
        className={s.picker}
        {...props}
        {...field}
        onChange={(v) => field.onChange(v)}
      />
    </LocalizationProvider>
  )
}
export default MUIDatePicker
