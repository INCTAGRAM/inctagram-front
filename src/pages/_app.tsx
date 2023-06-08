import '@/assets/styles/reset.css'
import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { useLoader } from '@/hooks/useLoader'
import '@/assets/styles/nprogress.scss'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Redirect } from '@/common/layout/redirect/Redirect'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <Redirect>{getLayout(<Component {...pageProps} />)}</Redirect>
    </Provider>
  )
}
