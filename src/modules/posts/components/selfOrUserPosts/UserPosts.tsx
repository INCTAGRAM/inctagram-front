import { useAppSelector } from '@/store/store'
import styles from './Posts.module.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useGettingNewPostsOnScroll } from '@/modules/posts/hooks/useGettingNewPostsOnScroll'
import { useGetUserPostsProfileQuery } from '@/modules/posts/services/postsService'
import { useScrollEvent } from '@/hooks/useScrollEvent'
import { PostPreview } from '@/modules/posts/components/selfOrUserPosts/post/PostPreview'
import { PostPopup } from '@/modules/posts/components/post/PostPopup'
import { useGetUserProfileQuery } from '@/modules/profile'

type Props = {
  usernameInPath: string
}

export const UserPosts = ({ usernameInPath }: Props) => {
  const [postIdForPopup, setPostIdForPopup] = useState<string | null>(null)
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)
  const { getPosts } = useGettingNewPostsOnScroll()
  const postsRef = useRef<HTMLDivElement>(null)

  const { asPath } = useRouter()
  const pathArr = asPath.split(/[/?]/)
  const index = asPath.includes('?') ? pathArr.length - 2 : pathArr.length - 1
  const username = pathArr[index]

  const { data, isSuccess, isFetching } = useGetUserPostsProfileQuery({ ...queryParameters, username })
  const { data: dataUserProfile } = useGetUserProfileQuery({ username: usernameInPath })

  const scrollHandler = () => {
    data && getPosts(postsRef, data, queryParameters, scrollHandler)
  }

  useScrollEvent(scrollHandler, [data])

  if (!isSuccess || !data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </div>
      <PostPopup
        isSelfPost={false}
        postId={postIdForPopup}
        setPostId={setPostIdForPopup}
        posts={data.posts}
        usernameInPath={usernameInPath}
        avatar={dataUserProfile?.avatar.previewUrl ?? ''}
      />
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress size={45} />
        </div>
      )}
    </>
  )
}
