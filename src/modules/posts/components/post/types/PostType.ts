export type PostType = {
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
