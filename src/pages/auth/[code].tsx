import React from 'react'
import CreateNewPassword from '@/features/auth/CreateNewPassword/CreateNewPassword'
import { useRouter } from 'next/router'

const Code = () => {
  const { query } = useRouter()
  console.log(query.code)
  return (
    <div>
      <CreateNewPassword code={query.code as string} />
    </div>
  )
}

export default Code
