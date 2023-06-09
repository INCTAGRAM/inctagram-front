import styles from './InformationForPost.module.scss'
import { useLazyGetSelfPostProfileQuery, useLazyGetUserPostProfileQuery } from '@/modules/posts/services/postsService'
import React, { useEffect, useState } from 'react'
import { Gallery } from '@/modules/posts/components/selfOrUserPosts/postPopup/informationForPost/gallery/Gallery'
import { IPostResponse } from '@/modules/posts/services/types'
import CircularProgress from '@mui/material/CircularProgress'
import { PopupForControl } from '@/modules/posts/components/selfOrUserPosts/postPopup/informationForPost/popupForControl/PopupForControl'
import { EditTopPanel } from '@/modules/posts/components/selfOrUserPosts/postPopup/informationForPost/editTopPanel/EditTopPanel'
import { DescAndComments } from '@/modules/posts/components/selfOrUserPosts/postPopup/informationForPost/descAndComments/DescAndComments'
import { EditMode } from '@/modules/posts/components/selfOrUserPosts/postPopup/informationForPost/editMode/EditMode'

type Props = {
  isSelfPost: boolean
  postId: string | null
  usernameInPath: string
  avatar: string
  closePostPopup: () => void
}

export const InformationForPost = ({ isSelfPost, postId, usernameInPath, avatar, closePostPopup }: Props) => {
  const [getSelfPost, { data: selfPostData, isFetching: selfIsFetching }] = useLazyGetSelfPostProfileQuery()
  const [getUserPost, { data: userPostData, isFetching: userIsFetching }] = useLazyGetUserPostProfileQuery()
  const [postData, setPostData] = useState<IPostResponse | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoadingUpdatePost, setIsLoadingUpdatePost] = useState(false)

  useEffect(() => {
    if (isSelfPost) {
      selfPostData && setPostData(selfPostData)
    } else {
      userPostData && setPostData(userPostData)
    }
  }, [selfPostData, userPostData])

  useEffect(() => {
    if (postId) {
      isSelfPost && getSelfPost(postId)
      !isSelfPost && getUserPost({ username: usernameInPath, postId })
    }
  }, [postId, isSelfPost])

  const editMode = () => {
    setIsEditMode(true)
  }

  if (selfIsFetching || userIsFetching || isLoadingUpdatePost) {
    return (
      <div className={styles.post}>
        <div className={styles.loading}>
          <CircularProgress size={60} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.post}>
      {isEditMode && <EditTopPanel setIsEditMode={setIsEditMode} />}
      <Gallery images={postData?.images ?? []} />
      {!isEditMode ? (
        <div className={styles.information}>
          <div className={styles.top}>
            <div className={styles.usernameAndAvatar}>
              <img src={avatar} alt={''} />
              <p>{usernameInPath}</p>
            </div>
            <PopupForControl
              isSelfPost={isSelfPost}
              postId={postId}
              closePostPopup={closePostPopup}
              editMode={editMode}
            />
          </div>
          <DescAndComments avatar={avatar} usernameInPath={usernameInPath} description={postData?.description ?? ''} />
        </div>
      ) : (
        <EditMode
          postId={postId ?? ''}
          avatar={avatar}
          username={usernameInPath}
          description={postData?.description ?? ''}
          setIsEditMode={setIsEditMode}
          setIsLoadingUpdatePost={setIsLoadingUpdatePost}
        />
      )}
    </div>
  )
}
