import { scopes } from '@/constants/scopes'

export const RouteNames = {
  LOGIN: '/login',
  REGISTER: '/registration',
  REGISTER_CONFIRMATION: '/registration/confirmation',
  RECOVERY: '/recovery',
  NEW_PASSWORD: '/recovery/new-password',
  NEW_PASSWORD_CONFIRMATION: '/recovery/confirmation',
  RECOVERY_EXPIRED: '/recovery/expired',
  HOME: '/',
  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile/settings',
} as const

export const PublicRoutes: string[] = [
  RouteNames.LOGIN,
  RouteNames.REGISTER,
  RouteNames.REGISTER_CONFIRMATION,
  RouteNames.RECOVERY,
  RouteNames.NEW_PASSWORD_CONFIRMATION,
  RouteNames.NEW_PASSWORD,
  RouteNames.RECOVERY_EXPIRED,
]

export const externalLinks = {
  github: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${scopes.join(
    ' '
  )}`,
}

export const PrivateRoutes: string[] = [RouteNames.HOME, RouteNames.PROFILE, RouteNames.PROFILE_SETTINGS]
