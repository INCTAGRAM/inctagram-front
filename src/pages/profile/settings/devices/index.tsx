import { useRouter } from 'next/router'

const Index = () => {
  const { push } = useRouter()

  push('/profile/settings?section=devices', '/profile/settings/devices')
  return <></>
}

export default Index
