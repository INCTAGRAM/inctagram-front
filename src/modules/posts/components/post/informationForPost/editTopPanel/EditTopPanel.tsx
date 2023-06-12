import styles from '@/modules/posts/components/post/informationForPost/InformationForPost.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'

type Props = {
  setIsEditMode: (editMode: boolean) => void
}

export const EditTopPanel = ({ setIsEditMode }: Props) => {
  return (
    <div className={styles.editPanel}>
      <p className={styles.title}>Edit Post</p>
      <button onClick={() => setIsEditMode(false)}>
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon="close-outline" size={30} />
      </button>
    </div>
  )
}
