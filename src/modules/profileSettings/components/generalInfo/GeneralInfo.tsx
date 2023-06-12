import React, { useState } from 'react'
import { Button } from '@/common/ui/button/Button'
import styles from './GeneralInfo.module.scss'
import { InputText } from '@/common/ui/inputText/InputText'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useGetSelfProfileQuery, useUpdateUserProfileMutation } from '@/modules/profile/services/profileService'
import moment from 'moment'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'
import { Textarea } from '@/common/ui/textarea/Textarea'
import { ObjectType } from '@sinclair/typebox/value/is'
import { SuccessSnackbar } from '@/common/ui/alertSnackbar/SuccessSnackbar'
import { changeProfileSchema } from '@/modules/profileSettings/helpers/profile-schemes'
import { AddAvatar } from '@/modules/profileSettings/components/generalInfo/addAvatar/AddAvatar'
import DatePicker from '@/modules/profileSettings/components/generalInfo/datePicker/DatePicker'

export type SetProfileType = yup.InferType<typeof changeProfileSchema>

export const GeneralInfo = () => {
  const { data: profileData } = useGetSelfProfileQuery()
  const [updateProfile, { isSuccess, isError, error }] = useUpdateUserProfileMutation()
  const [username, setUsername] = useState(profileData?.username ?? '')
  const [firstName, setFirstName] = useState(profileData?.name ?? '')
  const [lastName, setLastName] = useState(profileData?.surname ?? '')
  const [city, setCity] = useState(profileData?.city ?? '')
  const [aboutMe, setAboutMe] = useState(profileData?.aboutMe ?? '')

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

    const dataObj: ObjectType = { ...data, birthday }
    for (const key in dataObj) {
      if (dataObj[key as keyof ObjectType] === '') {
        delete dataObj[key as keyof ObjectType]
      }
    }

    updateProfile(dataObj)
  }

  return (
    <>
      <div className={styles.content}>
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
                value={aboutMe}
                onChangeText={setAboutMe}
                error={errors.aboutMe?.message}
              />
            </p>
            <Button className={styles.saveBtn} type={'submit'} width={'auto'}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
      {isSuccess && <SuccessSnackbar message={'Profile updated successfully'} />}
    </>
  )
}
