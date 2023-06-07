import { EmptyProfile } from '@/modules/auth'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Empty: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'You do not have an account'}>
      <EmptyProfile />
    </HeadMeta>
  )
}

Empty.getLayout = getBaseLayout

export default Empty
