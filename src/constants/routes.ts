import { scopes } from '@/constants/scopes'

export const RouteNames = {
  LOGIN: '/login',
  REGISTER: '/registration',
  REGISTER_CONFIRMATION: '/registration/confirmation',
  GIT_HUB_REGISTRATION: '/registration/github',
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
  RouteNames.GIT_HUB_REGISTRATION,
]

export const ExternalLinks = {
  github: `https://github.com/login/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  }&scope=${scopes.join(' ')}`,
}
