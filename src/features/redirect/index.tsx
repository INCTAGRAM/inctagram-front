import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RouteNames, PublicRoutes, PrivateRoutes } from '@/constants/routes'
import { useAppSelector } from '@/services/redux/store'

const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = useAppSelector((state) => state.tokenReducer.accessToken)
  const { push, pathname } = useRouter()

  const isPublicRouteValid = accessToken && PublicRoutes.includes(pathname)
  const isPrivateRouteValid = !accessToken && PrivateRoutes.includes(pathname)

  useEffect(() => {
    if (isPublicRouteValid) push(RouteNames.PROFILE)
    if (isPrivateRouteValid) push(RouteNames.LOGIN)
  }, [isPublicRouteValid, isPrivateRouteValid, push])

  return <>{children}</>
}

export default Redirect
