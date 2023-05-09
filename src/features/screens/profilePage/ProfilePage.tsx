import ProfileInfo from '@/features/profile/profileInfo/ProfileInfo'
import styles from './ProfilePage.module.scss'
import { useCheckUserProfileQuery } from '@/services/profile/profileService'
import { ErrorSnackbar } from '@/common/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient()
//
//   await queryClient.prefetchQuery(['profile'], profileService.checkUserProfile)
//
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

const ProfilePage = () => {
  const { data, isSuccess, isError, error } = useCheckUserProfileQuery()
  // const { data, isSuccess, isError, error } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: profileService.checkUserProfile,
  //   retry: false,
  // })

  return (
    <div className={styles.page_wrapper}>
      {isSuccess && data && <ProfileInfo info={data} />}
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </div>
  )
}
export default ProfilePage
