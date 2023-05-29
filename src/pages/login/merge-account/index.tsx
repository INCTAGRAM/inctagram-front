import React from 'react'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { MergeAccount } from '@/modules/auth/components/mergeAccount/MergeAccount'

const MergeAccountPage = () => {
  return <MergeAccount />
}

MergeAccountPage.getLayout = getBaseLayout
export default MergeAccountPage
