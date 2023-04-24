export interface IProfileData {
  name?: string
  surname?: string
  birthday?: string
  city?: string
  aboutMe?: string
}

export interface IProfileResponse {
  username: string
  name: string
  surname: string
  birthday: string
  city: string
  aboutMe: string
  avatar: IUploadAvatarResponse
}

export interface IUploadAvatarResponse {
  url: string
  previewUrl: string
}

export interface IUploadAvatarData {
  file: string
}

export interface IProfileSettingResponse {
  statusCode: 'string'
  message: ['string']
  path: 'string'
}
