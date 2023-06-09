export interface IPostsResponse {
  count: number
  posts: IPost[]
}

export interface IPost {
  id: string
  imagesCount: number
  previewUrl: string
  createdAt: string
}

export interface IUserPostsRequestData {
  username: string
  page?: number
  pageSize: number
  id?: string
}

export type IPostsRequestData = Omit<IUserPostsRequestData, 'username'>

export interface IPostResponse {
  id: string
  description: string
  images: ImagesPost[]
  createdAt: string
  updatedAt: string
}

export type ImagesPost = {
  url: string
  previewUrl: string
  metadata: {
    width: number
    height: number
  }
}

export interface IPostPatchData {
  body: {
    description: string
  }
  id: string | undefined
}

export interface IUserPostRequestParams {
  username: string
  postId: string
}
