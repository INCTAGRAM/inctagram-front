import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RouteNames, UnprotectedRoutes } from '@/constants/routes'

const LoginRedirect: FC<PropsWithChildren> = ({ children }) => {
  const { push, pathname } = useRouter()

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const pathIsProtected = UnprotectedRoutes.indexOf(pathname) === -1

  useEffect(() => {
    if (!accessToken && pathIsProtected) push(RouteNames.LOGIN)
  }, [accessToken, pathIsProtected, push])

  return <>{children}</>
}

export default LoginRedirect
