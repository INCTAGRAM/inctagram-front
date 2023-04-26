import '@/assets/styles/reset.css'
import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactElement, ReactNode, useState } from 'react'
import { NextPage } from 'next'
import { useLoader } from '@/hooks/useLoader'
import '@/assets/styles/nprogress.css'
import Redirect from '@/features/redirect'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  useLoader()

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Redirect>
          <Component {...pageProps} />
        </Redirect>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
