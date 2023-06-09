import styles from './InformationForPost.module.scss'
import { useLazyGetSelfPostProfileQuery, useLazyGetUserPostProfileQuery } from '@/modules/posts/services/postsService'
import { useEffect, useState } from 'react'
import { Gallery } from '@/modules/posts/components/post/informationForPost/gallery/Gallery'
import { IPostResponse } from '@/modules/posts/services/types'
import CircularProgress from '@mui/material/CircularProgress'
import { PopupForControl } from '@/modules/posts/components/post/informationForPost/popupForControl/PopupForControl'

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

  return (
    <div className={styles.post}>
      {selfIsFetching || userIsFetching ? (
        <div className={styles.loading}>
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          <Gallery images={postData?.images ?? []} />
          <div className={styles.information}>
            <div className={styles.top}>
              <div className={styles.usernameAndAvatar}>
                <img src={avatar} alt={''} />
                <p>{usernameInPath}</p>
              </div>
              <PopupForControl isSelfPost={isSelfPost} postId={postId} closePostPopup={closePostPopup} />
            </div>
            <div className={styles.descAndComments}>
              <div className={styles.desc}>
                <img src={avatar} alt="" />
                <p>
                  <span>{usernameInPath}</span>
                  {postData?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
