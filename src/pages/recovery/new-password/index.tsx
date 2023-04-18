import React from 'react'
import NewPasswordPage from '@/features/screens/newPasswordPage/NewPasswordPage'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const NewPassword: NextPageWithLayout = () => {
  const { query } = useRouter()

  return (
    <HeadMeta title={'New password'}>
      <NewPasswordPage code={query.code as string} email={query.email as string} />
    </HeadMeta>
  )
}

NewPassword.getLayout = getBaseLayout
export default NewPassword
