import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/common/ui/button/Button'
import profilePhotoExample from '@/../public/blank-profile-picture-973460_1280 (1).webp'
import s from './ProfileSettingsPage.module.scss'
import Form from '@/features/ProfileSettings/form/Form'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/ProfileSettings/datePicker/DatePicker'
import { TextField } from '@mui/material'
import { RouteNames } from '@/constants/routes'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/services/config'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeProfileSchema } from '@/validations/auth-schemes'
import * as yup from 'yup'
import { IProfileSettingResponse } from '@/services/auth/types'
import moment from 'moment/moment'
import TopPanel from '@/features/ProfileSettings/TopPanel/TopPanel'

export type SetProfileType = yup.InferType<typeof changeProfileSchema>

type SetProfileRequestType = Pick<SetProfileType, Exclude<keyof SetProfileType, 'birthday'>> & { birthday: string }

const ProfileSettingsPage = () => {
  const { mutate: createProfile, isSuccess } = useMutation<IProfileSettingResponse, unknown, SetProfileRequestType>({
    mutationFn: async (data) => {
      return instance.post<IProfileSettingResponse>(`/users/self/profile`, data).then((response) => response.data)
    },
  })

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
    const birthday = data.birthday ? moment(data.birthday, 'DD.MM.YYYY').format('YYYY-MM-DD')! : ''
    createProfile({ ...data, birthday })
  }

  return (
    <div>
      <div className={s.content}>
        <TopPanel />
        <div className={s.container}>
          <div>
            <Image src={profilePhotoExample} alt={''} width={192} height={192} className={s.Image} />
            <Button className={s.button}>Add a Profile Photo</Button>
          </div>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <p>
              <InputText
                fieldName={'Username'}
                {...register('username')}
                error={errors.username?.message ? errors.username.message : ''}
              />
            </p>
            <p>
              <InputText
                fieldName={'Name'}
                {...register('name')}
                error={errors.name?.message ? errors.name.message : ''}
              />
            </p>
            <p>
              <InputText
                fieldName={'Surname'}
                {...register('surname')}
                error={errors.surname?.message ? errors.surname.message : ''}
              />
            </p>
            <DatePicker register={register} name={'birthday'} control={control} />
            <p>
              <InputText
                fieldName={'City'}
                {...register('city')}
                error={errors.city?.message ? errors.city.message : ''}
              />
            </p>
            <TextField
              multiline
              rows={3}
              label={'About me'}
              {...register('aboutMe')}
              className={s.aboutMeTextFieldStyle}
              error={!!errors.username?.message}
              helperText={errors.username?.message ? errors.username.message : ''}
            />
            <Button type={'submit'}>Save Changes</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
ProfileSettingsPage.getBaseLayout = getBaseLayout

export default ProfileSettingsPage
