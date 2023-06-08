import { useAppDispatch, useAppSelector } from '@/store/store'
import styles from './Posts.module.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useRef, useState } from 'react'
import { changeQueryParameters, refetchSelfPosts } from '@/modules/posts/store/postsSlice'
import { useGettingNewPostsOnScroll } from '@/modules/posts/hooks/useGettingNewPostsOnScroll'
import { useGetSelfPostsProfileQuery } from '@/modules/posts'
import { IPost } from '@/modules/posts/services/types'
import { PostPopup } from '@/modules/posts/components/post/popup/PostPopup'
import { PostPreview } from '@/modules/posts/components/selfOrUserPosts/post/PostPreview'

export const SelfPosts = () => {
  const dispatch = useAppDispatch()
  const [postForPopup, setPostForPopup] = useState<IPost | null>(null)
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)
  const isRefetchingPosts = useAppSelector((state) => state.postsReducer.isRefetchingPosts)
  const { getPosts } = useGettingNewPostsOnScroll()

  const { data, isSuccess, isFetching, refetch } = useGetSelfPostsProfileQuery(queryParameters)

  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(refetchSelfPosts(false))
  }, [data])

  useEffect(() => {
    if (data && isRefetchingPosts && queryParameters.page === 1 && queryParameters.pageSize === 12) {
      refetch()
    } else if (data && isRefetchingPosts) {
      dispatch(changeQueryParameters({ page: 1, pageSize: data.posts.length }))
    }
  }, [isRefetchingPosts])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [data])

  const scrollHandler = () => {
    data && getPosts(postsRef, data, queryParameters, scrollHandler)
  }

  if (!isSuccess || !data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </div>
      <PostPopup post={postForPopup} setPost={setPostForPopup} />
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress size={45} />
        </div>
      )}
    </>
  )
}
