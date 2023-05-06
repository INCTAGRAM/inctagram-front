import React, { ChangeEvent, useRef } from 'react'
import { Popup } from '@/common/ui/popup/Popup'
import styles from './AddPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'
import { IPost } from './../types'
import { postInitial } from '@/features/popups/createPostPopup/CreatePostPopup'

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
  const closePopup = () => {
    setPost(postInitial)
    setIsShowAddPhotoPopup(false)
  }

  const inpFile = useRef<HTMLInputElement | null>(null)

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current!.value = ''
    }
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPost({ ...post, originalImages: [...post.originalImages, reader.result] })
          setIsShowAddPhotoPopup(false)
          console.log(1)
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
          <input
            ref={inpFile}
            type="file"
            name="myImage"
            accept="image/*"
            onClick={clearInputContent}
            onChange={uploadHandler}
          />
          <Button>Select from computer</Button>
        </label>
      </div>
    </Popup>
  )
}
