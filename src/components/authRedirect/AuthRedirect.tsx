import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'

export const AuthRedirect: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (!accessToken && router.pathname === '/') {
      router.push('/auth/login')
    }
  }, [accessToken])

  return <>{children}</>
}
