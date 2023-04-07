import '@/assets/styles/reset.css'
import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthRedirect } from '@/components/authRedirect'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <AuthRedirect>
        <Component {...pageProps} />
      </AuthRedirect>
    </QueryClientProvider>
  )
}
