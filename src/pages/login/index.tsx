import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { LoginPage } from '@/modules/auth/components/loginPage/LoginPage'

const Login: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Login'}>
      <LoginPage />
    </HeadMeta>
  )
}

Login.getLayout = getBaseLayout
export default Login
