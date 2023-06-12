import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'
import React from 'react'
import styles from './BodyUploadPhotoPopup.module.scss'

interface IBodyUploadPhotoPopup {
  onClick: () => void
}

export const BodyUploadPhotoPopup = ({ onClick }: IBodyUploadPhotoPopup) => {
  return (
    <div className={styles.container_content}>
      <div className={styles.container_icon}>
        <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
      </div>
      <Button onClick={onClick}>Select from computer</Button>
    </div>
  )
}
