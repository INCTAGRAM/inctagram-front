import styles from './EditMode.module.scss'
import React, { useState } from 'react'
import { Textarea } from '@/common/ui/textarea/Textarea'
import { Button } from '@/common/ui/button/Button'
import { usePatchProfilePostMutation } from '@/modules/posts/services/postsService'

type Props = {
  postId: string
  avatar: string
  username: string
  description: string
}

export const EditMode = ({ postId, avatar, username, description }: Props) => {
  const [editPost, {}] = usePatchProfilePostMutation()
  const [desc, setDesc] = useState(description)

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
