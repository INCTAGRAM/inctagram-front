import '@/assets/styles/reset.css'
import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoginRedirect from '@/features/loginRedirect'
import { ReactElement, ReactNode, useState } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <LoginRedirect>
        <Component {...pageProps} />
      </LoginRedirect>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
