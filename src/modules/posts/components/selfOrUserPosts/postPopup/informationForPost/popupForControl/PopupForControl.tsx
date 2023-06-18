import styles from './PopupForControl.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useClosePopupClickDocument } from '@/hooks/useClosePopupClickDocument'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { useRouter } from 'next/router'
import { ConfirmActionPopup } from '@/common/ui/popup/confirmActionPopup/ConfirmActionPopup'
import { postsService, useDeleteProfilePostMutation } from '@/modules/posts/services/postsService'
import { useAppDispatch } from '@/store/store'

type Props = {
  isSelfPost: boolean
  postId: string | null
  closePostPopup: () => void
  editMode: () => void
}

export const PopupForControl = ({ isSelfPost, postId, closePostPopup, editMode }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDeletePostPopup, setIsOpenDeletePostPopup] = useState(false)
  const [deletePost, { isSuccess }] = useDeleteProfilePostMutation()
  const popupForControlRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    if (isSuccess) {
      closePostPopup()
      setIsOpenDeletePostPopup(false)
      dispatch(
        postsService.util.updateQueryData('getSelfPostsProfile', { pageSize: 0 }, (draftPosts) => {
          return {
            ...draftPosts,
            posts: draftPosts.posts.filter((post) => post.id !== postId),
            count: draftPosts.count - 1,
          }
        })
      )
    }
  }, [isSuccess])

  const closePopupForControl = () => {
    setIsOpen(false)
  }

  useClosePopupClickDocument(popupForControlRef, isOpen, closePopupForControl, [isOpen])

  const editPostHandler = () => {
    editMode()
    setIsOpen(false)
  }

  const closeDeletePostPopup = () => {
    setIsOpenDeletePostPopup(false)
  }

  const deletePostHandler = () => {
    postId && deletePost(postId)
  }

  const reportPostHandler = () => {
    console.log('Report')
  }

  const unsubscribePostHandler = () => {
    console.log('Unsubscribe')
  }

  const copyLinkPostHandler = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    navigator.clipboard.writeText(`${origin}${asPath}`)
  }

  return (
    <div className={styles.topPanel} ref={popupForControlRef}>
      <button>
        <IcomoonReact
          onClick={() => setIsOpen(true)}
          iconSet={iconSet}
          color={'#397DF6'}
          icon="more-horizontal"
          size={30}
        />
      </button>
      {isOpen && (
        <div className={styles.controlElements}>
          {isSelfPost ? (
            <>
              <button onClick={editPostHandler}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon="edit-2-outline" size={20} />
                <span>Edit Post</span>
              </button>
              <button onClick={() => setIsOpenDeletePostPopup(true)}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon="trash-outline" size={20} />
                <span>Delete Post</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={reportPostHandler}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon="email-outline" size={20} />
                <span>Report</span>
              </button>
              <button onClick={unsubscribePostHandler}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon="person-remove-outline" size={20} />
                <span>Unsubscribe</span>
              </button>
              <button onClick={copyLinkPostHandler}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon="copy-outline" size={20} />
                <span>Copy Link</span>
              </button>
            </>
          )}
        </div>
      )}
      <ConfirmActionPopup
        show={isOpenDeletePostPopup}
        title={'Delete Post'}
        text={'Are you sure you want to delete this previewPost?'}
        closeActionHandler={closeDeletePostPopup}
        confirmActionHandler={deletePostHandler}
      />
    </div>
  )
}
