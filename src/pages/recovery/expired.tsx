import React from 'react'
import ExpiredPage from '@/features/screens/feedbackPages/ExpiredPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Expired: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Expired'}>
      <ExpiredPage />
    </HeadMeta>
  )
}

Expired.getLayout = getBaseLayout
export default Expired
