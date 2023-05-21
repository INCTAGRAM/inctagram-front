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

export interface IPostsRequestData {
  page: number
  pageSize: number
}
