import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/screens/profileSettingsPage/datePicker/DatePicker'
import { TextField } from '@mui/material'
import { Button } from '@/common/ui/button/Button'
import React, { PropsWithChildren, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import s from './form.module.scss'
import { useMutation } from '@tanstack/react-query'
import { decode } from 'jsonwebtoken'
import { getConvertedDate } from '@/features/screens/profileSettingsPage/fn/convertDate'
import { instance } from '@/services/config'

interface IFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const Form = ({ onSubmit, children }: PropsWithChildren<IFormProps>) => {
  return (
    <form className={s.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
export default Form
