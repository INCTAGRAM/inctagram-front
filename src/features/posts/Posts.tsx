import styles from './Posts.module.scss'
import { useGetPostsProfileQuery } from '@/services/profile/profileService'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'
import { changePage } from '@/services/redux/postsReducer'

export const Posts = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.postsReducer.page)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isSuccess, refetch } = useGetPostsProfileQuery({ page: currentPage, pageSize: 12 })

  useEffect(() => {
    if (currentPage === 1 && page === 'initialRefetch') {
      refetch()
    } else if (typeof page === 'number') {
      setCurrentPage(page)
    }
  }, [page])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e: Event) => {
    // console.log('scroll')
    dispatch(changePage(2))
  }

  if (!isSuccess || !data) return null

  return (
    <div className={styles.posts}>
      {data.posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <img src={post.previewUrl} />
          <div className={styles.likesAndComments}>
            <span>
              <IcomoonReact iconSet={iconSet} icon="heart" color={'white'} className={styles.icon} size={22} />0
            </span>
            <span>
              <IcomoonReact iconSet={iconSet} icon="message-circle" color={'white'} className={styles.icon} size={22} />
              0
            </span>
          </div>
          {post.imagesCount > 1 && (
            <span className={styles.iconGallery}>
              <IcomoonReact iconSet={iconSet} icon="image" color={'white'} className={styles.icon} size={27} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
