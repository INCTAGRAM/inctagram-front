import { useRouter } from 'next/router'

const Index = () => {
  const { push } = useRouter()

  push('/profile/settings?section=payments', '/profile/settings/payments')
  return <></>
}

export default Index
