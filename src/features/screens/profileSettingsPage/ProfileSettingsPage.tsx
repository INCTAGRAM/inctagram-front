import React from 'react'
import s from './ProfileSettingsPage.module.scss'
import { useQuery } from '@tanstack/react-query'
import { changeProfileSchema } from '@/validations/profile-schemes'
import * as yup from 'yup'
import { profileService } from '@/services/profile/profileService'
import TopPanel from '@/features/profileSettings/topPanel/TopPanel'
import Avatar from '@/features/profileSettings/avatar/Avatar'
import ProfileSettingsForm from '@/features/profileSettings/form/ProfileSettingsForm'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { errorHandler } from '@/hooks/errorsHandler'
import { AxiosError } from 'axios/index'

export type SetProfileType = yup.InferType<typeof changeProfileSchema>

const ProfileSettingsPage = () => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.checkUserProfile,
    retry: false,
  })
  return (
    <div>
      <div className={s.content}>
        <TopPanel />
        <div className={s.container}>
          {isSuccess && data && <Avatar data={data} />}
          {isSuccess && data && <ProfileSettingsForm data={data} />}
          {isError && <AlertSnackbar type={'error'} message={errorHandler(error as AxiosError)} />}
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
