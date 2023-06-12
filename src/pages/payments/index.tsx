import { useRouter } from 'next/router'

const Index = () => {
  const { push, query } = useRouter()

  push(
    `/profile/settings?section=account_management&success=${query.success === 'true'}`,
    `/profile/settings/account_management?success=${query.success === 'true'}`
  )
  return <></>
}

export default Index
