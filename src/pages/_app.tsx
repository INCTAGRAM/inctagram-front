import '@/assets/styles/reset.css'
import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoginRedirect from '@/features/loginRedirect'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginRedirect>
        <Component {...pageProps} />
      </LoginRedirect>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
