export interface ILoginResponse {
  accessToken: string
}

export interface IAuthData {
  userName: string
  email: string
  password: string
}

export interface INewPasswordData {
  newPassword: string
  recoveryCode: string
}
