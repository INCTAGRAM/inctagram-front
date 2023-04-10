export interface ILoginResponse {
  accessToken: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IRegistrationData {
  userName: string
  email: string
  password: string
}

export interface INewPasswordData {
  newPassword: string
  recoveryCode: string
}
