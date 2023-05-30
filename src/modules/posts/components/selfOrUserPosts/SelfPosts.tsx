import { useAppDispatch, useAppSelector } from '@/store/store'
import styles from './Posts.module.scss'
import Modal from '@/modules/posts/components/post/modal/Modal'
import { DisplayPostPopup } from '@/modules/posts/components/post/DisplayPostPopup'
import Link from 'next/link'
import { LikesCommentsCount } from '@/modules/posts/components/selfOrUserPosts/likesCommentsCount/LikesCommentsCount'
import { GalleryIcon } from '@/modules/posts/components/selfOrUserPosts/gallaryIcon/GalleryIcon'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { changeQueryParameters, refetchSelfPosts } from '@/modules/posts/store/postsSlice'
import { useGettingNewPostsOnScroll } from '@/modules/posts/hooks/useGettingNewPostsOnScroll'
import { useGetSelfPostsProfileQuery } from '@/modules/posts'
import { useGetPostProfileQuery } from '@/modules/posts/services/postsService'

export const SelfPosts = () => {
  const dispatch = useAppDispatch()
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)
  const isRefetchingPosts = useAppSelector((state) => state.postsReducer.isRefetchingPosts)
  const { getPosts } = useGettingNewPostsOnScroll()

  const { data, isSuccess, isFetching, refetch } = useGetSelfPostsProfileQuery(queryParameters)

  const router = useRouter()
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
          <div className={styles.post} key={post.id}>
            {router.query.id === post.id && (
              <Modal>
                <DisplayPostPopup previewPost={post} isSelf={true} useGetPostProfileQuery={useGetPostProfileQuery} />
              </Modal>
            )}
            <Link href={`/profile/String/?id=${post.id}`}>
              <img src={post.previewUrl} alt={''} />
              <LikesCommentsCount likesCount={0} commentsCount={0} />
              {post.imagesCount > 1 && <GalleryIcon />}
            </Link>
          </div>
        ))}
      </div>
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress size={45} />
        </div>
      )}
    </>
  )
}
