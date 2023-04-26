import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'

export const useLoader = () => {
  const router = useRouter()

  useEffect(() => {
    const startLoading = () => NProgress.start()
    const endLoading = () => NProgress.done()

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', endLoading)
    router.events.on('routeChangeError', endLoading)

    return () => {
      router.events.on('routeChangeStart', startLoading)
      router.events.on('routeChangeComplete', endLoading)
      router.events.on('routeChangeError', endLoading)
    }
  }, [router])
}
