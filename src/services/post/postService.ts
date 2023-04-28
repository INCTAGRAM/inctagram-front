import { instance } from '@/services/config'
import { TChangePost, TPayloadCreatePost, TResponseCreatePost } from '@/services/post/type'

export const postService = {
  createPost: (payload: TPayloadCreatePost) => {
    return instance.post<TResponseCreatePost>('/users/self/posts', { payload })
  },
  removePost: (id: string) => {
    return instance.delete(`/users/self/posts/${id}`)
  },
  changeDescriptionPost: (payload: TChangePost) => {
    return instance.patch(`/users/self/posts/${payload.id}`, payload.description)
  },
}
