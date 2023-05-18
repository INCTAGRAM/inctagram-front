import { Nullable } from '@/common/types/Nullable'

export interface IProfileData {
  userName?: string
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

export interface IAddPostResponse {
  id: string
  userId: string
  description: string
  createdAt: string
  updatedAt: string
  images: IImagesPost[]
}

export interface IPostsRequestData {
  page: number
  pageSize: number
}

export interface IPostsResponse {
  count: number
  posts: IPost[]
}

interface IPost {
  id: string
  imagesCount: number
  previewUrl: string
  createdAt: string
}

export interface IImagesPost {
  id: string
  postId: string
  url: string
  previewUrl: string
  createdAt: string
  updatedAt: string
}
