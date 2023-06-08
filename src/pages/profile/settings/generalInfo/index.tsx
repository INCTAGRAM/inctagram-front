import { useRouter } from 'next/router'

const Index = () => {
  const { push } = useRouter()

  push('/profile/settings?section=general_information', '/profile/settings/general_information')
  return <></>
}

export default Index
