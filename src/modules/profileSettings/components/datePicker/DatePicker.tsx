import React, { PropsWithChildren } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import styles from './DatePicker.module.scss'
import { FieldValues, useController, UseFormRegister } from 'react-hook-form'
import { SetProfileType } from '@/modules/profileSettings/components/ProfileSettings'
import { DatePicker } from '@mui/x-date-pickers'
import { Control } from 'react-hook-form/dist/types/form'
import dayjs from 'dayjs'

interface IDatePickerProps {
  register: UseFormRegister<SetProfileType>
  control: Control<FieldValues>
  name: string
  defaultValue?: string | null
}

const MUIDatePicker = ({ register, control, name, defaultValue, ...props }: PropsWithChildren<IDatePickerProps>) => {
  const { field } = useController({ control, name })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{
          textField: {
            error: false,
          },
        }}
        label={'Date of birthday'}
        format={'DD.MM.YYYY'}
        className={styles.picker}
        defaultValue={dayjs(defaultValue)}
        {...props}
        {...field}
        onChange={(v) => field.onChange(v)}
      />
    </LocalizationProvider>
  )
}
export default MUIDatePicker
