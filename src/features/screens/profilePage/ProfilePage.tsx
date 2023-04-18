import GeneralInfo, { IInfo } from '@/features/profile/generalInfo/GeneralInfo'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { instance } from '@/services/config'
import styles from './ProfilePage.module.scss'

const getProfile = () => instance.get<IInfo>('/users/self/profile').then((response) => response.data)

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['profile'], getProfile)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const ProfilePage = () => {
  const { data: profileInfo } = useQuery<IInfo, unknown, IInfo>({
    queryKey: ['posts'],
    queryFn: getProfile,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  return profileInfo ? (
    <div className={styles.page_wrapper}>
      <GeneralInfo info={profileInfo} />
    </div>
  ) : null
}
export default ProfilePage
