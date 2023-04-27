import { PrivateRoutes, PublicRoutes, RouteNames } from '@/constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const currentUrl = req.nextUrl
  const verify = req.cookies.get('isLoggedIn')

  console.log(verify)

  if (!verify && PrivateRoutes.includes(currentUrl.pathname)) {
    return NextResponse.redirect(new URL(RouteNames.LOGIN, currentUrl))
  }

  if (verify && PublicRoutes.includes(currentUrl.pathname)) {
    return NextResponse.redirect(new URL(RouteNames.PROFILE, currentUrl))
  }
}
