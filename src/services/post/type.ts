export type TResponseCreatePost = {
  id: string
  description: string
  userId: string
  images: [
    {
      id: 'string'
      url: 'string'
      previewUrl: 'string'
      createdAt: '2023-04-27T08:08:42.663Z'
      updatedAt: '2023-04-27T08:08:42.663Z'
      postId: 'string'
      metadata: {
        id: 'string'
        zoom: 0
        ratio: 'ORIGINAL'
        filters: ['string']
        size: 0
        width: 0
        height: 0
        imageId: 'string'
        createdAt: '2023-04-27T08:08:42.663Z'
        updatedAt: '2023-04-27T08:08:42.663Z'
        cropInfo: {
          x: 0
          y: 0
          width: 0
          height: 0
        }
      }
    }
  ]
}

export type TPayloadCreatePost = {
  files: File
  zoom?: number[]
  filters?: string[]
  cropInfo?: TCropInfo[]
  ratio?: string[]
}

type TCropInfo = {
  x: number
  y: number
  width: number
  height: number
}

export type TChangePost = {
  id: string
  description: string
}
