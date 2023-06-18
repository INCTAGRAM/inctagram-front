import { useState } from 'react'
import { useGetSelfPostsProfileQuery } from '@/modules/posts'
import { PostPopup } from '@/modules/posts/components/selfOrUserPosts/postPopup/PostPopup'
import { useAppSelector } from '@/store/store'
import { PreviewPostsGrid } from '@/modules/posts/components/selfOrUserPosts/previewPostsGrid/PreviewPostsGrid'

type Props = {
  usernameInPath: string
  avatar: string
}

export const SelfPosts = ({ usernameInPath, avatar }: Props) => {
  const [postIdForPopup, setPostIdForPopup] = useState<string | null>(null)
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)

  const { data, isSuccess, isFetching } = useGetSelfPostsProfileQuery(queryParameters)

  if (!isSuccess || !data) return null

  return (
    <>
      <PreviewPostsGrid data={data} isFetching={isFetching} />
      <PostPopup
        isSelfPost={true}
        postId={postIdForPopup}
        setPostId={setPostIdForPopup}
        posts={data.posts}
        usernameInPath={usernameInPath}
        avatar={avatar}
      />
    </>
  )
}
