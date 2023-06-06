import { RegistrationPage } from '@/modules/auth'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Registration: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Registration'}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
        <RegistrationPage />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

Registration.getLayout = getBaseLayout
export default Registration
