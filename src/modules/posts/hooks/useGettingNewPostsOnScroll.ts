import { useAppDispatch } from '@/store/store'
import { RefObject } from 'react'
import { changePage, changePageSize } from '@/modules/posts/store/postsSlice'
import { IPostsResponse } from '@/modules/posts/services/types'

export const useGettingNewPostsOnScroll = () => {
  const dispatch = useAppDispatch()

  const getPosts = (
    postsRef: RefObject<HTMLDivElement>,
    data: IPostsResponse,
    page: number,
    pageSize: number,
    scrollHandler: () => void
  ) => {
    if (!postsRef.current) return
    if (!data) return
    if (data.count / page <= pageSize) return

    const allScrollTop = window.scrollY + window.innerHeight
    if (allScrollTop + 100 > postsRef.current.offsetTop + postsRef.current.scrollHeight) {
      if (data.count === data.posts.length) return
      if (pageSize > 12) {
        dispatch(changePage(Math.floor(pageSize / 12) + 1))
        dispatch(changePageSize(12))
      } else {
        dispatch(changePage(page + 1))
      }

      document.removeEventListener('scroll', scrollHandler)
    }
  }

  return { getPosts }
}
