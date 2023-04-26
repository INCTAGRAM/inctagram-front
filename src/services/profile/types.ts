import { Nullable } from '@/common/types/Nullable'

export interface IProfileData {
  name?: string
  surname?: string
  birthday?: string
  city?: string
  aboutMe?: string
}

export interface IProfileResponse {
  username: string
  name: Nullable<string>
  surname: Nullable<string>
  birthday: Nullable<string>
  city: Nullable<string>
  aboutMe: Nullable<string>
  avatar: IUploadAvatarResponse
}

export interface IUploadAvatarResponse {
  url: Nullable<string>
  previewUrl: Nullable<string>
}

export interface IUploadAvatarData {
  file: string
}

export interface IProfileSettingResponse {
  statusCode: 'string'
  message: ['string']
  path: 'string'
}
