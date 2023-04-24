import EmptyProfilePage from '@/features/screens/feedbackPages/EmptyProfilePage'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Empty: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'You do not have an account'}>
      <EmptyProfilePage />
    </HeadMeta>
  )
}

Empty.getLayout = getBaseLayout

export default Empty
