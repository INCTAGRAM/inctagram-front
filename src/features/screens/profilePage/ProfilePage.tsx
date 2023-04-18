import ProfileInfo, { IInfo } from '@/features/profile/profileInfo/ProfileInfo'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import styles from './ProfilePage.module.scss'
import { profileService } from '@/services/profile/profileService'
import { IProfileResponse } from '@/services/profile/types'

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
  const { data: profileInfo } = useQuery<IProfileResponse, unknown, IInfo>({
    queryKey: ['posts'],
    queryFn: profileService.checkUserProfile,
  })

  return profileInfo ? (
    <div className={styles.page_wrapper}>
      <ProfileInfo info={profileInfo} />
    </div>
  ) : null
}
export default ProfilePage
