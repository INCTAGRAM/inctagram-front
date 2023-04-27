import React, { useEffect } from 'react'
import { InputText } from '@/common/ui/inputText/InputText'
import DatePicker from '@/features/profileSettings/datePicker/DatePicker'
import { createTheme, TextField } from '@mui/material'
import s from '@/features/screens/profileSettingsPage/ProfileSettingsPage.module.scss'
import { Button } from '@/common/ui/button/Button'
import Form from '@/features/profileSettings/form/Form'
import dayjs from 'dayjs'
import { SetProfileType } from '@/features/screens/profileSettingsPage/ProfileSettingsPage'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeProfileSchema } from '@/validations/profile-schemes'
import { useMutation } from '@tanstack/react-query'
import { IProfileData, IProfileSettingResponse } from '@/services/profile/types'
import { profileService } from '@/services/profile/profileService'
import { RouteNames } from '@/constants/routes'
import { useRouter } from 'next/router'
import { IInfo } from '@/features/profile/profileInfo/ProfileInfo'
import { ThemeProvider } from '@mui/system'

interface IProfileSettingsFormProps {
  data: IInfo
}

const ProfileSettingsForm = ({ data }: IProfileSettingsFormProps) => {
  const { mutate: createProfile, isSuccess } = useMutation<IProfileSettingResponse, unknown, IProfileData>({
    mutationFn: profileService.updateUserProfile,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SetProfileType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(changeProfileSchema),
    defaultValues: {
      name: data.name ?? '',
      surname: data.surname ?? '',
      city: data.city ?? '',
      aboutMe: data.aboutMe ?? '',
      username: data.username ?? '',
    },
  })

  const { push } = useRouter()

  useEffect(() => {
    isSuccess && push(RouteNames.PROFILE)
  }, [isSuccess, push])

  const onFormSubmit = (data: SetProfileType) => {
    const birthday = data.birthday ? dayjs(data.birthday, 'DD.MM.YYYY').format('YYYY-MM-DD')! : ''
    createProfile({ ...data, birthday })
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <p>
        <InputText
          fieldName={'Username'}
          {...register('username')}
          error={errors.name?.message ? errors.name.message : ''}
        />
      </p>
      <p>
        <InputText
          fieldName={'First Name'}
          {...register('name')}
          error={errors.name?.message ? errors.name.message : ''}
        />
      </p>
      <p>
        <InputText
          fieldName={'Last Name'}
          {...register('surname')}
          error={errors.surname?.message ? errors.surname.message : ''}
        />
      </p>
      <DatePicker register={register} name={'birthday'} control={control} />
      <p>
        <InputText fieldName={'City'} {...register('city')} error={errors.city?.message ? errors.city.message : ''} />
      </p>
      <ThemeProvider theme={theme}>
        <TextField
          multiline
          rows={3}
          label={'About me'}
          {...register('aboutMe')}
          className={s.aboutMeTextFieldStyle}
          error={!!errors.aboutMe?.message}
          helperText={errors.aboutMe?.message ? errors.aboutMe.message : ''}
        />
      </ThemeProvider>
      <Button type={'submit'}>Save Changes</Button>
    </Form>
  )
}

export default ProfileSettingsForm

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '1px solid #333333',
        },
      },
    },
  },
})
