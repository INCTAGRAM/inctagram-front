import { Registration } from '@/modules/auth'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'

const RegistrationPage: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Registration'}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
        <Registration />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

RegistrationPage.getLayout = getBaseLayout
export default RegistrationPage
