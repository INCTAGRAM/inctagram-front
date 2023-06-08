import { useAppDispatch } from '@/store/store'
import { RefObject } from 'react'
import { IPostsRequestData, IPostsResponse } from '@/modules/posts/services/types'
import { changeQueryParameters } from '@/modules/posts/store/postsSlice'

export const useGettingNewPostsOnScroll = () => {
  const dispatch = useAppDispatch()

  const getPosts = (
    postsRef: RefObject<HTMLDivElement>,
    data: IPostsResponse,
    queryParameters: IPostsRequestData,
    scrollHandler: () => void
  ) => {
    if (!postsRef.current) return
    if (!data) return

    const allScrollTop = window.scrollY + window.innerHeight
    if (allScrollTop + 100 > postsRef.current.offsetTop + postsRef.current.scrollHeight) {
      if (data.count === data.posts.length) return
      const cursor = data.posts[data.posts.length - 1].id
      dispatch(changeQueryParameters({ id: cursor, pageSize: 12 }))

      document.removeEventListener('scroll', scrollHandler)
    }
  }

  return { getPosts }
}
