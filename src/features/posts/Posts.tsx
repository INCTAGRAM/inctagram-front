import styles from './Posts.module.scss'
import { useGetPostsProfileQuery } from '@/services/profile/profileService'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'
import { changePage, refatchPosts } from '@/services/redux/postsReducer'
import Modal from '@/features/modal/Modal'
import DisplayPostPopup from '@/features/popups/displayPostPopup/DisplayPostPopup'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Posts = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = 12
  const refetchPosts = useAppSelector((state) => state.postsReducer.refetchWithSameParams)
  const { data, isLoading, isSuccess, refetch } = useGetPostsProfileQuery({ page, pageSize })
  const router = useRouter()

  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSuccess) {
      dispatch(refatchPosts(false))
    }
  }, [isSuccess])

  useEffect(() => {
    if (refetchPosts && page === 1) {
      refetch()
    } else if (refetchPosts) {
      dispatch(changePage(1))
    }
  }, [refetchPosts])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [data])

  const scrollHandler = () => {
    if (!postsRef.current) return
    if (!data) return
    console.log(data.count / page)
    if (data.count / page <= pageSize) return

    const allScrollTop = window.scrollY + window.innerHeight
    if (allScrollTop + 100 > postsRef.current.offsetTop + postsRef.current.scrollHeight) {
      dispatch(changePage(page + 1))
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
