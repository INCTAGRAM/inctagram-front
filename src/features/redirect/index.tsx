import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RouteNames, PublicRoutes, PrivateRoutes } from '@/constants/routes'
import { isTokenExpired } from '@/services/jwt/isTokenExpired'

const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const { push, pathname } = useRouter()

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const isPublicRouteValid = !isTokenExpired(accessToken) && PublicRoutes.includes(pathname)
  const isPrivateRouteValid = isTokenExpired(accessToken) && PrivateRoutes.includes(pathname)

  useEffect(() => {
    if (isPublicRouteValid) push(RouteNames.PROFILE)
    if (isPrivateRouteValid) push(RouteNames.LOGIN)
  }, [isPublicRouteValid, isPrivateRouteValid, push])

  return <>{children}</>
}

export default Redirect
