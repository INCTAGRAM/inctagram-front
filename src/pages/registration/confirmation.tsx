import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { Confirmation } from '@/modules/auth/components/registrationConfirmation/Confirmation'

const ConfirmationPage: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Congratulations'}>
      <Confirmation />
    </HeadMeta>
  )
}

ConfirmationPage.getLayout = getBaseLayout
export default ConfirmationPage
