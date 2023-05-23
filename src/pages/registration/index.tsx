import { RegistrationPage } from '@/modules/auth/components/registrationPage/RegistrationPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'

const Registration: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Registration'}>
      <RegistrationPage />
    </HeadMeta>
  )
}

Registration.getLayout = getBaseLayout
export default Registration
