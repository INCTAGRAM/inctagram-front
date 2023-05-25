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
