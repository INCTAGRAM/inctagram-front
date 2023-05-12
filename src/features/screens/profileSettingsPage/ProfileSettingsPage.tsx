import React, { useEffect, useState } from 'react'
import { Button } from '@/common/ui/button/Button'
import styles from './ProfileSettingsPage.module.scss'
import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/profileSettings/datePicker/DatePicker'
import { RouteNames } from '@/constants/routes'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeProfileSchema } from '@/validations/profile-schemes'
import * as yup from 'yup'
import { useCheckUserProfileQuery, useUpdateUserProfileMutation } from '@/services/profile/profileService'
import TopPanel from '@/features/profileSettings/topPanel/TopPanel'
import moment from 'moment'
import { ErrorSnackbar } from '@/common/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'
import { AddAvatar } from '@/features/profileSettings/addAvatar/AddAvatar'
import { Textarea } from '@/common/ui/textarea/Textarea'

export type SetProfileType = yup.InferType<typeof changeProfileSchema>

export const ProfileSettingsPage = () => {
  const { data: profileData } = useCheckUserProfileQuery()
  const [createProfile, { isSuccess, isError, error }] = useUpdateUserProfileMutation()
  const [username, setUsername] = useState(profileData?.username ?? '')
  const [firstName, setFirstName] = useState(profileData?.name ?? '')
  const [lastName, setLastName] = useState(profileData?.surname ?? '')
  const [city, setCity] = useState(profileData?.city ?? '')

  const { push } = useRouter()

  useEffect(() => {
    isSuccess && push(RouteNames.PROFILE)
  }, [isSuccess, push])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SetProfileType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(changeProfileSchema),
  })

  const onFormSubmit = (data: SetProfileType) => {
    const birthday = data.birthday ? moment(data.birthday, 'DD.MM.YYYY').format('YYYY-MM-DD') : ''
    if (birthday === '') {
      createProfile({
        userName: data.username,
        name: data.name,
        surname: data.surname,
        city: data.city,
        aboutMe: data.aboutMe,
      })
    } else {
      createProfile({ ...data, birthday })
    }
  }

  return (
    <>
      <div className={styles.content}>
        <TopPanel />
        <div className={styles.container}>
          <AddAvatar previewUrl={profileData?.avatar.previewUrl ?? undefined} />
          <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
            <p>
              <InputText
                fieldName={'Username'}
                {...register('username')}
                value={username}
                onChangeText={setUsername}
                error={errors.username?.message ?? ''}
              />
            </p>
            <p>
              <InputText
                fieldName={'First Name'}
                {...register('name')}
                value={firstName}
                onChangeText={setFirstName}
                error={errors.name?.message ?? ''}
              />
            </p>
            <p>
              <InputText
                fieldName={'Last Name'}
                {...register('surname')}
                value={lastName}
                onChangeText={setLastName}
                error={errors.surname?.message ?? ''}
              />
            </p>
            <DatePicker register={register} name={'birthday'} control={control} defaultValue={profileData?.birthday} />
            <p>
              <InputText
                fieldName={'City'}
                {...register('city')}
                value={city}
                onChangeText={setCity}
                error={errors.city?.message ? errors.city.message : ''}
              />
            </p>
            <p>
              <span className={styles.aboutMeTitle}>About Me</span>
              <Textarea
                className={styles.aboutMeText}
                {...register('aboutMe')}
                value={profileData?.aboutMe ?? ''}
                error={errors.aboutMe?.message}
              />
            </p>
            <Button className={styles.saveBtn} type={'submit'}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}
