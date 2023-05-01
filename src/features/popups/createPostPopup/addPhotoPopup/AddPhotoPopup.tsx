import React, { ChangeEvent } from 'react'
import { Popup } from '@/common/ui/popup/Popup'
import styles from './AddPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'
import { IPost } from '@/features/popups/createPostPopup/types'

interface IAddPhotoPopupProps {
  post: IPost
  setPost: (post: IPost) => void
  isShowAddPhotoPopup: boolean
  setIsShowAddPhotoPopup: (isShow: boolean) => void
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
}

export const AddPhotoPopup = ({
  isShowAddPhotoPopup,
  setIsShowAddPhotoPopup,
  setIsShowCroppingPhotoPopup,
  post,
  setPost,
}: IAddPhotoPopupProps) => {
  const closePopup = () => setIsShowAddPhotoPopup(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPost({ ...post, images: [...post.images, reader.result] })
          setIsShowAddPhotoPopup(false)
          setIsShowCroppingPhotoPopup(true)
        }
      }
    }
  }

  return (
    <Popup title="Add photo" show={isShowAddPhotoPopup} modalOnClick={closePopup}>
      <div className={styles.upload_container}>
        <div className={styles.icon_container}>
          <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
        </div>
        <label>
          <input type="file" name="myImage" accept="image/*" onChange={uploadHandler} />
          <Button>Select from computer</Button>
        </label>
      </div>
    </Popup>
  )
}
