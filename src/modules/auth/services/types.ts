export interface ITokenResponse {
  accessToken: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface ILoginGoogleResponse {
  accessToken: string
}

export interface IRegistrationData {
  username: string
  email: string
  password: string
}

export interface IRecoveryData {
  email: string
  recaptchaToken: string
}

export interface INewPasswordData {
  newPassword: string
  recoveryCode: string
}

export interface IErrorResponse {
  status: number | string
  data: IErrorResponseData
}

interface IErrorResponseData {
  statusCode: number
  message: string[]
  path: string
}
