import '@/assets/styles/reset.css'
import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { useLoader } from '@/hooks/useLoader'
import '@/assets/styles/nprogress.css'
import Redirect from '../common/layout/redirect'
import { Provider } from 'react-redux'
import { wrapper } from '@/store/store'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  useLoader()

  const getLayout = Component.getLayout ?? ((page) => page)
  const { store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      {getLayout(
        <Redirect>
          <Component {...pageProps} />
        </Redirect>
      )}
    </Provider>
  )
}
