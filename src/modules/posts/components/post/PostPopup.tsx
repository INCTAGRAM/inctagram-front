import styles from './PostPopup.module.scss'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { RouteNames } from '@/constants/routes'
import { useClosePopupClickEl } from '@/hooks/useClosePopupClickEl'
import { IPost } from '@/modules/posts/services/types'
import { PrevOrNextPostBtn } from '@/modules/posts/components/post/prevOrNextPostBtn/PrevOrNextPostBtn'
import { ClosePostPopup } from '@/modules/posts/components/post/closePostPopup/ClosePostPopup'
import { InformationForPost } from '@/modules/posts/components/post/informationForPost/InformationForPost'
import { getIdNextOrPrevPost } from '@/modules/posts/helpers/getIdNextOrPrevPost'

type Props = {
  isSelfPost: boolean
  postId: string | null
  setPostId: (postId: string | null) => void
  posts: IPost[]
  usernameInPath: string
  avatar: string
}

export const PostPopup = ({ isSelfPost, postId, setPostId, posts, usernameInPath, avatar }: Props) => {
  const { query, push } = useRouter()
  const popupWrapperRef = useRef<HTMLDivElement>(null)

  const indexOfCurrentPost = posts.findIndex((post) => post.id === postId)

  useEffect(() => {
    if (typeof query.id === 'string') {
      setPostId(query.id)
    }
  }, [query])

  const closePostPopup = () => {
    setPostId(null)
    push(`${RouteNames.PROFILE}/${usernameInPath}`, undefined, { scroll: false })
  }

  useClosePopupClickEl(popupWrapperRef, !!postId, closePostPopup, [postId])

  const prevOrNextPostHandler = (isNext: boolean) => {
    if (postId) {
      setPostId(getIdNextOrPrevPost(postId, posts, isNext))
    }
  }

  if (postId) {
    return (
      <>
        <div className={styles.postPopup}>
          <ClosePostPopup closePostPopup={closePostPopup} />
          <PrevOrNextPostBtn
            isShow={indexOfCurrentPost > 0}
            isNext={false}
            prevOrNextCallback={prevOrNextPostHandler}
          />
          <InformationForPost
            isSelfPost={isSelfPost}
            postId={postId}
            usernameInPath={usernameInPath}
            avatar={avatar}
            closePostPopup={closePostPopup}
          />
          <PrevOrNextPostBtn
            isShow={indexOfCurrentPost < posts.length - 1}
            isNext={true}
            prevOrNextCallback={prevOrNextPostHandler}
          />
        </div>
        <div ref={popupWrapperRef} className={styles.popupWrapper}></div>
      </>
    )
  }
  return null
}
