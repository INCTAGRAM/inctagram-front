import React from 'react'
import LoginPage from '@/modules/auth/components/loginPage/LoginPage'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Login: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Login'} googleSignIn={true}>
      <GoogleOAuthProvider
        clientId={
          process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID ||
          '69255349786-mko80m2qf2l9vvdqlburo4dictmj7br8.apps.googleusercontent.com'
        }
      >
        <LoginPage />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

Login.getLayout = getBaseLayout
export default Login
