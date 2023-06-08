import { useRouter } from 'next/router'

const Index = () => {
  const { push, query } = useRouter()

  push('/profile/settings?section=account_management', '/profile/settings/account_management')
  return <></>
}

export default Index
