export enum RouteNames {
  RECOVERY = '/auth/recovery',
  EXPIRED = '/auth/recovery/expired',
  LOGIN = '/auth/login',
  REGISTER = '/auth/signUp',
  HOME = '/',
}

export const UnprotectedRoutes = [
  RouteNames.LOGIN,
  RouteNames.RECOVERY,
  RouteNames.EXPIRED,
  RouteNames.REGISTER,
] as string
