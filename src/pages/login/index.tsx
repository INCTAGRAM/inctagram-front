import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Login } from '@/modules/auth'

const LoginPage: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Login'}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
        <Login />
      </GoogleOAuthProvider>
    </HeadMeta>
  )
}

LoginPage.getLayout = getBaseLayout
export default LoginPage
