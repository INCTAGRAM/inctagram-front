import styles from './Posts.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React, { useEffect, useRef } from 'react'
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

export const Posts = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)
  const postsCount = useAppSelector((state) => state.postsReducer.postsCount)
  const isRefetchPosts = useAppSelector((state) => state.postsReducer.isRefetchPosts)
  const { data, isSuccess, refetch } = useGetPostsProfileQuery({ page, pageSize })
  const router = useRouter()

  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(refetchPosts(false))
  }, [data])

  useEffect(() => {
    if (data && isRefetchPosts && page === 1 && pageSize === 12) {
      refetch()
    } else if (data && isRefetchPosts) {
      dispatch(changePage(1))
      dispatch(changePageSize(data.posts.length))
    }

    if (data) dispatch(changePostsCount(data.count))
  }, [isRefetchPosts, data?.count])

  useEffect(() => {
    if (isRefetchPosts) return

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
            <div className={styles.likesAndComments}>
              <span>
                <IcomoonReact iconSet={iconSet} icon="heart" color={'white'} className={styles.icon} size={22} />0
              </span>
              <span>
                <IcomoonReact
                  iconSet={iconSet}
                  icon="message-circle"
                  color={'white'}
                  className={styles.icon}
                  size={22}
                />
                0
              </span>
            </div>
            {post.imagesCount > 1 && (
              <span className={styles.iconGallery}>
                <IcomoonReact iconSet={iconSet} icon="image" color={'white'} className={styles.icon} size={27} />
              </span>
            )}
          </Link>
        </div>
      ))}
    </div>
  )
}
