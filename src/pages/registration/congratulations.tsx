import RegistrationSuccessPage from '@/features/screens/feedbackPages/RegistrationSuccessPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Congratulations: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Congratulations'}>
      <RegistrationSuccessPage />
    </HeadMeta>
  )
}

Congratulations.getLayout = getBaseLayout
export default Congratulations
