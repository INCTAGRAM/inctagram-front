import React from 'react'
import NewPasswordPage from '@/features/screens/authPages/newPasswordPage/NewPasswordPage'
import { useRouter } from 'next/router'

const Code = () => {
  const { query } = useRouter()

  return (
    <div>
      <NewPasswordPage code={query.code as string} />
    </div>
  )
}

export default Code
