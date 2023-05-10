import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

export interface IPost {
  description: string
  originalImages: string[]
  croppingParameters: ICroppingParameters[]
  images: string[]
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
