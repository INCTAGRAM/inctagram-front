export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/registration',
  REGISTER_SUCCESS = '/registration/congratulations',
  RECOVERY = '/recovery',
  NEW_PASSWORD = '/recovery/new-password',
  RECOVERY_EXPIRED = '/recovery/expired',
  HOME = '/',
}

export const UnprotectedRoutes: string[] = [
  RouteNames.LOGIN,
  RouteNames.REGISTER,
  RouteNames.REGISTER_SUCCESS,
  RouteNames.RECOVERY,
  RouteNames.NEW_PASSWORD,
  RouteNames.RECOVERY_EXPIRED,
]
