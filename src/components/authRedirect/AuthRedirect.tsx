import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { UnprotectedRoutes } from '@/constants/routes'

export const AuthRedirect: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const pathIsProtected = UnprotectedRoutes.indexOf(router.pathname) === -1

  useEffect(() => {
    if (!accessToken && pathIsProtected) {
      router.push('/auth/login')
    }
  }, [accessToken])

  return <>{children}</>
}
