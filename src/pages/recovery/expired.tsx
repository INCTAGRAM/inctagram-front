import React from 'react'
import ExpiredPage from '@/features/screens/feedbackPages/ExpiredPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { useRouter } from 'next/router'

const Expired: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <HeadMeta title={'Expired'}>
      <ExpiredPage email={router.query.email as string} />
    </HeadMeta>
  )
}

Expired.getLayout = getBaseLayout
export default Expired
