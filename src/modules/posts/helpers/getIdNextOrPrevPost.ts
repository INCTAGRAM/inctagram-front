import { IPost } from '@/modules/posts/services/types'

export const getIdNextOrPrevPost = (currentId: string, posts: IPost[], isNext: boolean) => {
  let newId = ''
  const currentIndex = posts.findIndex((post) => post.id === currentId)
  if (currentIndex !== -1) {
    isNext ? (newId = posts[currentIndex + 1].id) : (newId = posts[currentIndex - 1].id)
  }

  return newId
}
