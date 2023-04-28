import React, { ChangeEvent } from 'react'
import Popup from '@/common/ui/popup/Popup'
import styles from './AddPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'

interface IAddPhotoPopup {
  isShowAddPhotoPopup: boolean
  setIsShowAddPhotoPopup: (arg: boolean) => void
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
  images: any
  setImages: (images: any) => void
}
export const AddPhotoPopup = ({
  isShowAddPhotoPopup,
  setIsShowAddPhotoPopup,
  setIsShowCroppingPhotoPopup,
  images,
  setImages,
}: IAddPhotoPopup) => {
  const closePopup = () => setIsShowAddPhotoPopup(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages([...images, { image: reader.result }])
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