import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { RegistrationSuccess } from '@/modules/auth'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Confirmation: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Congratulations'}>
      <RegistrationSuccess />
    </HeadMeta>
  )
}

Confirmation.getLayout = getBaseLayout
export default Confirmation
