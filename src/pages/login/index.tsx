import React from 'react'
import LoginPage from '@/features/screens/loginPage/LoginPage'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'

const Login: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Login'}>
      <LoginPage />
    </HeadMeta>
  )
}

Login.getLayout = getBaseLayout
export default Login
