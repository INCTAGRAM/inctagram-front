import { useAppSelector } from '@/store/store'
import styles from './Posts.module.scss'
import { LikesCommentsCount } from '@/modules/posts/components/selfOrUserPosts/likesCommentsCount/LikesCommentsCount'
import { GalleryIcon } from '@/modules/posts/components/selfOrUserPosts/gallaryIcon/GalleryIcon'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useGettingNewPostsOnScroll } from '@/modules/posts/hooks/useGettingNewPostsOnScroll'
import { useGetUserPostsProfileQuery } from '@/modules/posts/services/postsService'
import { useScrollEvent } from '@/hooks/useScrollEvent'

type Props = {
  usernameInPath: string
}

export const UserPosts = ({ usernameInPath }: Props) => {
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)
  const { getPosts } = useGettingNewPostsOnScroll()
  const postsRef = useRef<HTMLDivElement>(null)

  const { asPath } = useRouter()
  const pathArr = asPath.split(/[/?]/)
  const index = asPath.includes('?') ? pathArr.length - 2 : pathArr.length - 1
  const username = pathArr[index]

  const { data, isSuccess, isFetching } = useGetUserPostsProfileQuery({ ...queryParameters, username })

  const scrollHandler = () => {
    data && getPosts(postsRef, data, queryParameters, scrollHandler)
  }

  useScrollEvent(scrollHandler, [data])

  if (!isSuccess || !data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <div className={styles.post} key={post.id}>
            {/*{query.id === post.id && (*/}
            {/*  <Modal>*/}
            {/*    <DisplayPostPopup*/}
            {/*      previewPost={post}*/}
            {/*      isSelf={false}*/}
            {/*      useGetPostProfileQuery={useGetUserPostProfileQuery}*/}
            {/*    />*/}
            {/*  </Modal>*/}
            {/*)}*/}
            <img src={post.previewUrl} alt={''} />
            <LikesCommentsCount likesCount={0} commentsCount={0} />
            {post.imagesCount > 1 && <GalleryIcon />}
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
