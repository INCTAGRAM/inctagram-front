import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { Nullable } from '@/common/types/Nullable'

export interface IPost {
  description: string
  originalImages: string[]
  croppingParameters: ICroppingParameters[]
  images: string[]
  filterParameters: string[]
  prevFilterParameters: string[]
  imagesAfterFilters: string[]
  activeImage: number
}

export interface ICroppingParameters {
  crop: ICrop
  croppedArea: CroppedAreaType
  zoom: number
  aspect: number
}

export interface ICrop {
  x: number
  y: number
}

export interface IPosts {
  page: number
  pageSize: number
  postsCount: Nullable<number>
  isRefetchPosts: boolean
}
