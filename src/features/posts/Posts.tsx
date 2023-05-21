import styles from './Posts.module.scss'
import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'
import {
  changePage,
  changePageSize,
  changePostsCount,
  initialPostsState,
  refetchPosts,
} from '@/services/redux/postsReducer'
import Modal from '@/features/modal/Modal'
import DisplayPostPopup from '@/features/popups/displayPostPopup/DisplayPostPopup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGetPostsProfileQuery } from '@/services/posts/postService'
import { LikesCommentsCount } from '@/features/posts/likesCommentsCount/LikesCommentsCount'
import { GalleryIcon } from '@/features/posts/gallaryIcon/GalleryIcon'
import CircularProgress from '@mui/material/CircularProgress'

export const Posts = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)
  const postsCount = useAppSelector((state) => state.postsReducer.postsCount)
  const isRefetchingPosts = useAppSelector((state) => state.postsReducer.isRefetchingPosts)

  const { data, isSuccess, isFetching, refetch } = useGetPostsProfileQuery({ page, pageSize })

  const router = useRouter()
  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(refetchPosts(false))
  }, [data])

  useEffect(() => {
    if (data && isRefetchingPosts && page === 1 && pageSize === 12) {
      refetch()
    } else if (data && isRefetchingPosts) {
      dispatch(changePage(1))
      dispatch(changePageSize(data.posts.length))
    }

    if (data) dispatch(changePostsCount(data.count))
  }, [isRefetchingPosts, data?.count])

  useEffect(() => {
    if (isRefetchingPosts) return

    if (data && postsCount === null) {
      dispatch(changePostsCount(data.count))
    } else if (data && data.count !== postsCount) {
      dispatch(changePage(1))
      dispatch(changePageSize(data.posts.length + initialPostsState.pageSize))
    }
  }, [data?.count])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [data])

  const scrollHandler = () => {
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

  if (!isSuccess || !data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <div className={styles.post} key={post.id}>
            {router.query.id && (
              <Modal>
                <DisplayPostPopup previewPost={post} />
              </Modal>
            )}
            <Link href={`/profile?id=${post.id}`}>
              <img src={post.previewUrl} alt={''} />
              <LikesCommentsCount likesCount={0} commentsCount={0} />
              {post.imagesCount > 1 && <GalleryIcon />}
            </Link>
          </div>
        ))}
      </div>
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress size={60} />
        </div>
      )}
    </>
  )
}
