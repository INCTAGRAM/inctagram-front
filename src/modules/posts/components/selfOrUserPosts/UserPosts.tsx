import { useAppSelector } from '@/store/store'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useGetUserPostsProfileQuery } from '@/modules/posts/services/postsService'
import { PostPopup } from '@/modules/posts/components/selfOrUserPosts/postPopup/PostPopup'
import { useGetUserProfileQuery } from '@/modules/profile'
import { PreviewPostsGrid } from '@/modules/posts/components/selfOrUserPosts/previewPostsGrid/PreviewPostsGrid'

type Props = {
  usernameInPath: string
}

export const UserPosts = ({ usernameInPath }: Props) => {
  const [postIdForPopup, setPostIdForPopup] = useState<string | null>(null)
  const queryParameters = useAppSelector((state) => state.postsReducer.queryParameters)

  const { asPath } = useRouter()
  const pathArr = asPath.split(/[/?]/)
  const index = asPath.includes('?') ? pathArr.length - 2 : pathArr.length - 1
  const username = pathArr[index]

  const { data, isSuccess, isFetching } = useGetUserPostsProfileQuery({ ...queryParameters, username })
  const { data: dataUserProfile } = useGetUserProfileQuery({ username: usernameInPath })

  if (!isSuccess || !data) return null

  return (
    <>
      <PreviewPostsGrid data={data} isFetching={isFetching} />
      <PostPopup
        isSelfPost={false}
        postId={postIdForPopup}
        setPostId={setPostIdForPopup}
        posts={data.posts}
        usernameInPath={usernameInPath}
        avatar={dataUserProfile?.avatar.previewUrl ?? ''}
      />
    </>
  )
}
