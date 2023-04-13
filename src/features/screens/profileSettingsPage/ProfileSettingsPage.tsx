import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/common/ui/button/Button'
import profilePhotoExample from '@/../public/blank-profile-picture-973460_1280 (1).webp'
import s from './profileSettingsPage.module.scss'
import Form from './Form/Form'
import { decode } from 'jsonwebtoken'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/screens/profileSettingsPage/datePicker/DatePicker'
import { TextField } from '@mui/material'
import { RouteNames } from '@/constants/routes'
import { useForm } from 'react-hook-form'
import { getConvertedDate } from '@/features/screens/profileSettingsPage/fn/convertDate'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/services/config'
import { yupResolver } from '@hookform/resolvers/yup'
import { createProfileSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'

const ProfileSettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createProfileType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(createProfileSchema),
  })
  const onFormSubmit = (data: createProfileType) => {
    data.birthday = getConvertedDate(data.birthday)
    createProfile(data)
  }
  const { push } = useRouter()

  const { mutate: createProfile, isSuccess } = useMutation<any, any, any>({
    mutationFn: async (data) => {
      const decodedData = decode(localStorage.getItem('accessToken')!)!
      let id
      if (typeof decodedData !== 'string') id = decodedData.userId
      await instance.post(`/users/${id}/profile`, data)
    },
  })

  useEffect(() => {
    isSuccess && push(RouteNames.PROFILE)
  }, [isSuccess, push])
  return (
    <div>
      <div className={s.content}>
        <h1>Create profile</h1>
        <div className={s.line}></div>
        <div className={s.container}>
          <div>
            <Image src={profilePhotoExample} alt={''} width={192} height={192} className={s.Image} />
            <Button className={s.button}>Add a Profile Photo</Button>
          </div>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <p>
              <span>Username</span>
              <InputText
                fieldName={'username'}
                {...register('username')}
                error={errors.username?.message ? errors.username.message : ''}
              />
            </p>
            <p>
              <span>Name</span>
              <InputText
                fieldName={'name'}
                {...register('name')}
                error={errors.name?.message ? errors.name.message : ''}
              />
            </p>
            <p>
              <span>Surname</span>
              <InputText
                fieldName={'surname'}
                {...register('surname')}
                error={errors.surname?.message ? errors.surname.message : ''}
              />
            </p>
            <DatePicker register={register} />
            <p>
              <span>City</span>
              <InputText
                fieldName={'city'}
                {...register('city')}
                error={errors.city?.message ? errors.city.message : ''}
              />
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
              error={!!errors.username?.message}
              helperText={errors.username?.message ? errors.username.message : ''}
            />
            <Button>Create</Button>
          </Form>
        </div>
        <div style={{ position: 'relative', bottom: '75px' }} className={s.line}></div>
      </div>
    </div>
  )
}
ProfileSettingsPage.getBaseLayout = getBaseLayout

export default ProfileSettingsPage

type createProfileType = yup.InferType<typeof createProfileSchema>
const aboutMeTextFieldStyle = {
  input: {
    color: '#FFFFFF',
    backgroundColor: '#333333',
  },
  backgroundColor: '#171717',
  border: '2px solid #333333',
  borderRadius: '2px',
}
