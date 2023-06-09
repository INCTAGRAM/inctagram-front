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
  croppedArea: ICroppedArea
  zoom: number
  aspect: number
}

export interface ICroppedArea {
  width: number
  height: number
  x: number
  y: number
}

export interface ICrop {
  x: number
  y: number
}

export interface IDataIndexedDB extends IPost {
  postId: string
}
