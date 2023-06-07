import React from 'react'
import { Expired } from '@/modules/auth'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { useRouter } from 'next/router'

const ExpiredPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <HeadMeta title={'Expired'}>
      <Expired email={router.query.email as string} />
    </HeadMeta>
  )
}

ExpiredPage.getLayout = getBaseLayout

export default ExpiredPage
