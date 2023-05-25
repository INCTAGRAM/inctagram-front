export interface IAddPostResponse {
  id: string
  userId: string
  description: string
  createdAt: string
  updatedAt: string
  images: IImagesPost[]
}

export interface IImagesPost {
  id: string
  postId: string
  url: string
  previewUrl: string
  createdAt: string
  updatedAt: string
}
