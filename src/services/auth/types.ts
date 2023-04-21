export interface ILoginResponse {
  accessToken: string
}

export interface IProfileSettingResponse {
  statusCode: 'string'
  message: ['string']
  path: 'string'
}

export interface ILoginData {
  email: string
  password: string
}

export interface IRegistrationData {
  username: string
  email: string
  password: string
}

export interface IConfirmationData {
  statusCode: string
  message: string[]
  path: string
}

export interface INewPasswordData {
  newPassword: string
  recoveryCode: string
}

export interface INewPasswordError {
  statusCode: number
  message: string[]
  path: string
}
