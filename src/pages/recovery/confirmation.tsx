import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import RegistrationSuccessPage from '@/features/screens/feedbackPages/RegistrationSuccessPage'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Confirmation: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Congratulations'}>
      <RegistrationSuccessPage />
    </HeadMeta>
  )
}

Confirmation.getLayout = getBaseLayout
export default Confirmation
