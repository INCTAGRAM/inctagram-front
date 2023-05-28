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

export interface IUserPostsRequestData {
  username: string
  page: number
  pageSize: number
}

export type ISelfPostsRequestData = Omit<IUserPostsRequestData, 'username'>

export interface IPostResponse {
  id: string
  description: string
  images: Array<{
    url: string
    previewUrl: string
    metadata: {
      width: number
      height: number
    }
  }>
  createdAt: string
  updatedAt: string
}

export interface IPostPatchData {
  body: {
    description: string
  }
  id: string | undefined
}
