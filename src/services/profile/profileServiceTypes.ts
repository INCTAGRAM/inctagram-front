export interface IProfileData {
  name: string
  surname: string
  birthday: string
  city: string
  aboutMe: string
}

export interface IUploadAvatarResponse {
  url: string
  previewUrl: string
}

export interface IUploadAvatarData {
  file: string
}
