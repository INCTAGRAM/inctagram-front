import { useState } from 'react'
import { InputLabel, TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const MyComponent = ({ register, name, ...props }: any) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()))

  const handleDateChange = (date: Dayjs) => {
    console.log(date)
    setSelectedDate(dayjs(date))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={'Date of birthday'}
        {...props}
        value={selectedDate!}
        InputLabelProps={{
          style: { color: '#FFFFFF' },
        }}
        sx={style}
        {...register('birthday')}
        onChange={handleDateChange}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
export default MyComponent

const style = {
  input: { color: 'white' },
  label: { color: 'white' },
  display: 'inline-block',
  svg: { color: '#FFFFFF' },
}
