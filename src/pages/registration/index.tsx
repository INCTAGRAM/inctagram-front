import { RegistrationPage } from '@/modules/auth/components/registrationPage/RegistrationPage'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Registration: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Registration'}>
      <GoogleOAuthProvider
        clientId={
          process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID ||
          '69255349786-mko80m2qf2l9vvdqlburo4dictmj7br8.apps.googleusercontent.com'
        }
      >
        <RegistrationPage />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

Registration.getLayout = getBaseLayout
export default Registration
