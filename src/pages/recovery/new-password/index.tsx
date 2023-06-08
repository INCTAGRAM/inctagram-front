import React from 'react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { NewPassword } from '@/modules/auth'

const NewPasswordPage: NextPageWithLayout = () => {
  const { query } = useRouter()

  return (
    <HeadMeta title={'New password'}>
      <NewPassword code={query.code as string} email={query.email as string} />
    </HeadMeta>
  )
}

NewPasswordPage.getLayout = getBaseLayout
export default NewPasswordPage
