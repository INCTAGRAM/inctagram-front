import RecoveryPage from '@/features/screens/recoveryPage/RecoveryPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Recovery: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Recovery password'}>
      <RecoveryPage />
    </HeadMeta>
  )
}

Recovery.getLayout = getBaseLayout

export default Recovery
