import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/screens/profileSettingsPage/datePicker/DatePicker'
import { TextField } from '@mui/material'
import { Button } from '@/common/ui/button/Button'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import s from './form.module.scss'
import { useMutation } from '@tanstack/react-query'
import { decode } from 'jsonwebtoken'
import { getConvertedDate } from '@/features/screens/profileSettingsPage/fn/convertDate'
import { instance } from '@/services/config'

const Form = () => {
  const { push } = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const { mutate: createProfile, isSuccess } = useMutation<any, any, any>({
    mutationFn: async (data) => {
      const decodedData = decode(localStorage.getItem('accessToken')!)!
      let id
      if (typeof decodedData !== 'string') id = decodedData.userId
      await instance.post(`/users/${id}/profile`, data)
    },
  })
  const onSubmit = (data: FormValues) => {
    data.birthday = getConvertedDate(data.birthday)
    createProfile(data)
  }
  useEffect(() => {
    isSuccess && push('/profile')
  }, [isSuccess, push])

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <p>
        <span>Username</span>
        <InputText fieldName={'username'} {...register('username')} />
      </p>
      <p>
        <span>Name</span>
        <InputText fieldName={'name'} {...register('name')} />
      </p>
      <p>
        <span>Surname</span>
        <InputText fieldName={'surname'} {...register('surname')} />
      </p>
      <DatePicker register={register} />
      <p>
        <span>City</span>
        <InputText fieldName={'city'} {...register('city')} />
      </p>

      <TextField
        multiline
        rows={3}
        {...register('aboutMe')}
        InputLabelProps={{
          style: { color: '#FFFFFF' },
        }}
        label={'About me'}
        sx={aboutMeTextFieldStyle}
      />
      <div>
        <Button>Create</Button>
      </div>
    </form>
  )
}
export default Form

const aboutMeTextFieldStyle = {
  input: {
    color: '#FFFFFF',
    backgroundColor: '#333333',
  },
  backgroundColor: '#171717',
  border: '2px solid #333333',
  borderRadius: '2px',
}
type FormValues = {
  username: string
  name: string
  surname: string
  birthday: string
  city: string
  aboutMe: string
}
