import GeneralInfo from '@/features/profile/generalInfo/GeneralInfo'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { instance } from '@/services/config'

const getProfile = () => instance.get('/users/self/profile').then((response) => response.data)

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
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getProfile,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  return <GeneralInfo />
}

export default ProfilePage
