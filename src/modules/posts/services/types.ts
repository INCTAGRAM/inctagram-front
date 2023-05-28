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
