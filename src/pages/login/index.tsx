import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LoginPage } from '@/modules/auth'

const Login: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Login'}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
        <LoginPage />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

Login.getLayout = getBaseLayout
export default Login
