'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './DisplayPostPopup.module.scss'
import { useRouter } from 'next/router'
import { useDeleteProfilePostMutation, usePatchProfilePostMutation } from '@/modules/posts/services/postsService'
import { PostType } from '@/modules/posts/components/post/types/PostType'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import Avatar from '@/modules/posts/components/post/avatar/Avatar'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { PreviewPost } from '@/modules/posts/components/post/types/PreviewPost'

type DisplayPostPopupPropsType = {
  previewPost: PreviewPost
  isSelf: boolean
  useGetPostProfileQuery: any
}

export const DisplayPostPopup = ({ previewPost, isSelf, useGetPostProfileQuery }: DisplayPostPopupPropsType) => {
  const router = useRouter()
  const pathArr = router.asPath.split(/[/?]/)
  const username = pathArr[pathArr.length - 2]
  const { isLoading, data, isFetching } = useGetPostProfileQuery(
    isSelf ? previewPost.id : { postId: previewPost.id, username }
  )
  const [post, setPost] = useState<PostType | undefined>(undefined)
  const { data: userData } = useGetSelfProfileQuery()
  const [showSettings, setShowSettings] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const control = useRef(null as HTMLDivElement | null)
  const settingsModalControl = useRef(null as HTMLDivElement | null)
  const moreHorizIconColor = showSettings ? '#397DF6' : '#FFFFFF'
  const deleteIconControl = useRef(null as HTMLDivElement | null)
  const [deletePost] = useDeleteProfilePostMutation()
  const [patchPost] = usePatchProfilePostMutation()

  const onEditDescriptionTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editedDescription.length < 500 && setEditedDescription(e.currentTarget.value)
  }
  const deletePostHandler = () => {
    deletePost(post?.id)
    router.push('/profile')
  }
  const changePostHandler = () => {
    patchPost({ body: { description: editedDescription }, id: post?.id })
    setIsEditMode(false)
    router.push('/profile')
  }

  const isCloseModalClick = (e: MouseEvent) => {
    if (control.current !== null) {
      if (!control.current!.contains(e.target as Node)) {
        router.push('/profile')
        document.removeEventListener('click', isCloseModalClick)
      }
    }
  }

  const isClickOutSettingsModal = (e: MouseEvent) => {
    if (settingsModalControl.current !== null) {
      if (showSettings) {
        if (!settingsModalControl.current!.contains(e.target as Node)) {
          setShowSettings(false)
          document.removeEventListener('click', isClickOutSettingsModal)
        }
      }
    }
  }

  const closeDeleteModalHandler = (e: React.MouseEvent) => {
    setShowDeleteModal(false)
    e.stopPropagation()
  }
  const onMoreClickHandler = (e: React.MouseEvent) => {
    setShowSettings((s) => !s)
    e.stopPropagation()
  }
  const onDeleteOpnHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowDeleteModal(true)
    e.stopPropagation()
  }
  const onEditOpnHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsEditMode(true)
    e.stopPropagation()
  }
  const onCloseEditModeHandler = (e: React.MouseEvent) => {
    setIsEditMode(false)
    e.stopPropagation()
  }

  const deleteIconStopPropagation = () => {
    if (deleteIconControl.current !== null) {
      deleteIconControl.current!.addEventListener('click', deleteIconStopPropagation)
    }
  }

  useEffect(() => {
    document.addEventListener('click', isCloseModalClick)
  }, [])

  useEffect(() => {
    if (showSettings) {
      setTimeout(() => {
        document.addEventListener('click', isClickOutSettingsModal)
      }, 0)
    }
  }, [showSettings])

  useEffect(() => {
    data && setPost(data)
    data && setEditedDescription(data.description)
  }, [data, isLoading])

  if (!post) return null
  if (isFetching) return null

  return (
    <div className={s.container} ref={control}>
      {showDeleteModal && (
        <div className={s.delete_post_popup}>
          <div className={s.delete_post_popup__head_block}>
            <div>Delete post</div>
            <IcomoonReact icon={'close'} iconSet={iconSet} color={'#ccc'} size={24} onClick={closeDeleteModalHandler} />
          </div>
          <div className={s.delete_post_popup__request_text}>Are you sure you want delete this post?</div>
          <div className={s.delete_post_popup__btns}>
            <button className={s.yes_btn} onClick={deletePostHandler}>
              Yes
            </button>
            <button className={s.no_btn} onClick={closeDeleteModalHandler}>
              No
            </button>
          </div>
        </div>
      )}

      <div className={s.edit_header_and_content}>
        {isEditMode && (
          <div className={s.edit_mode_head_block}>
            <span>Edit post</span>
            <IcomoonReact
              style={{ cursor: 'pointer' }}
              icon={'close'}
              iconSet={iconSet}
              color={'#ccc'}
              size={24}
              onClick={onCloseEditModeHandler}
            />
          </div>
        )}
        <div className={s.popup}>
          <div className={s.image}>
            <Image src={post.images[0].url} alt={''} fill />
          </div>
          <div className={s.info}>
            <div className={s.head_block}>
              <div className={s.avatar_and_name}>
                <Avatar previewUrl={userData?.avatar.previewUrl} />
                {userData?.username}
              </div>
              {!isEditMode && (
                <div className={s.btn_and_options}>
                  <IcomoonReact
                    icon={'more-horizontal'}
                    iconSet={iconSet}
                    color={moreHorizIconColor}
                    size={24}
                    style={{ cursor: 'pointer' }}
                    onClick={onMoreClickHandler}
                  />
                  {showSettings &&
                    (isSelf ? (
                      <div className={s.options} ref={settingsModalControl}>
                        <div onClick={onEditOpnHandler}>
                          <IcomoonReact icon={'edit-2-outline'} iconSet={iconSet} color={'#ccc'} size={24} />
                          <span>Edit post</span>
                        </div>
                        <div onClick={onDeleteOpnHandler}>
                          <IcomoonReact
                            icon={'trash-outline'}
                            iconSet={iconSet}
                            color={'#ccc'}
                            size={24}
                            ref={deleteIconControl}
                          />
                          <span>Delete post</span>
                        </div>
                      </div>
                    ) : (
                      <div className={s.user_options} ref={settingsModalControl}>
                        <div>
                          <IcomoonReact icon={'email-outline'} iconSet={iconSet} color={'#ccc'} size={24} />
                          <span>Report</span>
                        </div>
                        <div>
                          <IcomoonReact
                            icon={'person-remove-outline'}
                            iconSet={iconSet}
                            color={'#ccc'}
                            size={24}
                            ref={deleteIconControl}
                          />
                          <span>Unsubscribe</span>
                        </div>
                        <div>
                          <IcomoonReact
                            icon={'copy-outline'}
                            iconSet={iconSet}
                            color={'#ccc'}
                            size={24}
                            ref={deleteIconControl}
                          />
                          <span>Copy Link</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div>
              <div className={s.comment}>
                <div>
                  <Avatar previewUrl={userData?.avatar.previewUrl} />
                  {isEditMode && <span className={s.username}>{userData?.username}</span>}
                </div>
                {isEditMode ? (
                  <div className={s.edit_field_and_indication}>
                    <div className={s.indication}>Add publication descriptions</div>
                    <textarea
                      value={editedDescription}
                      onChange={onEditDescriptionTextareaChange}
                      className={s.textarea}
                    />
                    <div className={s.edited_post_text_length}>{editedDescription.length}/500</div>
                  </div>
                ) : (
                  <div className={s.comment_text}>
                    <span className={s.username}>{userData?.username}</span>
                    <span>{post.description}</span>
                  </div>
                )}
              </div>
            </div>
            {isEditMode ? (
              <button className={s.button} onClick={changePostHandler}>
                Save Changes
              </button>
            ) : (
              <div className={s.input_and_btn}>
                <input placeholder={'Add a comment...'} className={s.input} />
                <div className={s.publish_btn}>Publish</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
