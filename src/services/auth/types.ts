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

export interface INewPasswordData {
  newPassword: string
  recoveryCode: string
}
