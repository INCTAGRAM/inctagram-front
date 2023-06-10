import React, { useState } from 'react'
import Image from 'next/image'
import styles from './AddAvatar.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'
import { AddPhotoPopup } from '../addPhotoPopup/AddPhotoPopup'

interface IAddAvatarProps {
  previewUrl: string | undefined
}

export const AddAvatar = ({ previewUrl }: IAddAvatarProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false)

  const onClickHandler = (boolean: boolean) => {
    setIsShowPopup(boolean)
  }

  return (
    <div className={styles.upload_container}>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="profile avatar"
          width={192}
          height={192}
          unoptimized
          priority
          className={styles.image}
        />
      ) : (
        <div className={styles.icon_container}>
          <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
        </div>
      )}
      <Button className={styles.button} variant={'outlined'} onClick={() => onClickHandler(true)}>
        Add a Profile Photo
      </Button>
      <AddPhotoPopup isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </div>
  )
}
