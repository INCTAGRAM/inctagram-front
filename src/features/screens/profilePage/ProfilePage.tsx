import ProfileInfo, { IInfo } from '@/features/profile/profileInfo/ProfileInfo'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import styles from './ProfilePage.module.scss'
import { profileService } from '@/services/profile/profileService'
import React from 'react'
import { AxiosError } from 'axios'
import { errorHandler } from '@/hooks/errorsHandler'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['profile'], profileService.checkUserProfile)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const ProfilePage = () => {
  const {
    data: profileInfo,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.checkUserProfile,
    retry: false,
  })

  return (
    <div className={styles.page_wrapper}>
      {isSuccess && profileInfo && <ProfileInfo info={profileInfo} />}
      {isError && <AlertSnackbar type={'error'} message={errorHandler(error as AxiosError)} />}
    </div>
  )
}
export default ProfilePage
