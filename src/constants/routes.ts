export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/registration',
  REGISTER_CONFIRMATION = '/registration/confirmation',
  RECOVERY = '/recovery',
  NEW_PASSWORD = '/recovery/new-password',
  NEW_PASSWORD_CONFIRMATION = '/recovery/confirmation',
  RECOVERY_EXPIRED = '/recovery/expired',
  HOME = '/',
  PROFILE = '/profile',
  PROFILE_SETTINGS = '/profile/settings',
}

export const UnprotectedRoutes: string[] = [
  RouteNames.LOGIN,
  RouteNames.REGISTER,
  RouteNames.REGISTER_CONFIRMATION,
  RouteNames.RECOVERY,
  RouteNames.NEW_PASSWORD_CONFIRMATION,
  RouteNames.NEW_PASSWORD,
  RouteNames.RECOVERY_EXPIRED,
]
