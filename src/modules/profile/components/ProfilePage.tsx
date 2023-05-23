import { ProfileInfo } from '@/modules/profile/components/profileInfo/ProfileInfo'
import styles from './ProfilePage.module.scss'
import { useCheckUserProfileQuery } from '@/modules/profile/services/profileService'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'
import { PostsPage } from '@/modules/posts'

export const ProfilePage = () => {
  const { data, isSuccess, isError, error } = useCheckUserProfileQuery()

  return (
    <div className={styles.page_wrapper}>
      {isSuccess && data && <ProfileInfo info={data} />}
      <PostsPage />
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </div>
  )
}
