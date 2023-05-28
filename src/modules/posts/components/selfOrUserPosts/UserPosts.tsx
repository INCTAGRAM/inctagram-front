import { useAppSelector } from '@/store/store'
import styles from './Posts.module.scss'
import Modal from '@/modules/posts/components/post/modal/Modal'
import { DisplayPostPopup } from '@/modules/posts/components/post/DisplayPostPopup'
import Link from 'next/link'
import { LikesCommentsCount } from '@/modules/posts/components/selfOrUserPosts/likesCommentsCount/LikesCommentsCount'
import { GalleryIcon } from '@/modules/posts/components/selfOrUserPosts/gallaryIcon/GalleryIcon'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useGettingNewPostsOnScroll } from '@/modules/posts/hooks/useGettingNewPostsOnScroll'
import { useGetUserPostsProfileQuery } from '@/modules/posts/services/postsService'

export const UserPosts = () => {
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)
  const { getPosts } = useGettingNewPostsOnScroll()
  const postsRef = useRef<HTMLDivElement>(null)

  const { query, asPath } = useRouter()
  const pathArr = asPath.split('/')
  const username = pathArr[pathArr.length - 1]

  const { data, isSuccess, isFetching } = useGetUserPostsProfileQuery({ page, pageSize, username })

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [data])

  const scrollHandler = () => {
    data && getPosts(postsRef, data, page, pageSize, scrollHandler)
  }

  if (!isSuccess || !data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <div className={styles.post} key={post.id}>
            {query.id && (
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
          <CircularProgress size={45} />
        </div>
      )}
    </>
  )
}
