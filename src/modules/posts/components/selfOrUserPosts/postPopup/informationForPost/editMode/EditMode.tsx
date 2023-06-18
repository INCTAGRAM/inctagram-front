import styles from './EditMode.module.scss'
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/common/ui/textarea/Textarea'
import { Button } from '@/common/ui/button/Button'
import { useLazyGetSelfPostProfileQuery, usePatchProfilePostMutation } from '@/modules/posts/services/postsService'

type Props = {
  postId: string
  avatar: string
  username: string
  description: string
  setIsEditMode: (editMode: boolean) => void
  setIsLoadingUpdatePost: (isLoadingUpdatePost: boolean) => void
}

export const EditMode = ({ postId, avatar, username, description, setIsEditMode, setIsLoadingUpdatePost }: Props) => {
  const [editPost, { isSuccess, isLoading }] = usePatchProfilePostMutation()
  const [getSelfPost] = useLazyGetSelfPostProfileQuery()
  const [desc, setDesc] = useState(description)

  console.log(isLoading)

  useEffect(() => {
    if (isSuccess) {
      getSelfPost(postId)
      setIsEditMode(false)
      setIsLoadingUpdatePost(false)
    }
  }, [isSuccess, isLoading])

  const descChange = (value: string) => {
    setDesc(value)
  }

  const saveEdit = () => {
    editPost({
      body: {
        description: desc,
      },
      id: postId,
    })
  }

  return (
    <div className={styles.editMode}>
      <div className={styles.usernameAndAvatar}>
        <img src={avatar} alt={''} />
        <p>{username}</p>
      </div>
      <div className={styles.chengeDesc}>
        <p>Add publication descriptions</p>
        <Textarea value={desc} onChangeText={descChange} />
      </div>
      <Button width={'auto'} onClick={saveEdit}>
        Save Changes
      </Button>
    </div>
  )
}
