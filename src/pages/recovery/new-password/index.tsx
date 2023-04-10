import React from 'react'
import NewPasswordPage from '@/features/screens/newPasswordPage/NewPasswordPage'
import { useRouter } from 'next/router'

const Index = () => {
  const { query } = useRouter()

  return <NewPasswordPage code={query.code as string} />
}

export default Index
