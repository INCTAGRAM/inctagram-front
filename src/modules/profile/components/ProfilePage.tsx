import { ProfileInfo } from '@/modules/profile/components/profileInfo/ProfileInfo'
import { useCheckUserProfileQuery } from '@/modules/profile/services/profileService'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/modules/auth/services/types'

export const ProfilePage = () => {
  const { data, isSuccess, isError, error } = useCheckUserProfileQuery()

  return (
    <>
      {isSuccess && data && <ProfileInfo info={data} />}
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </>
  )
}
