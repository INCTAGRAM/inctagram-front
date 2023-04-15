import Popup from '@/common/ui/popup/Popup'
import React, { useState } from 'react'
import styles from './AddFhotoPopup.module.scss'
import { BodyUploadPhotoPopup } from '@/features/popups/addPhotoPopup/body/bodyUploadPhotoPopup/BodyUploadPhotoPopup'
import { BodySavePhotoPopup } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

interface IAddPhotoPopup {
  isShowPopup: boolean
  setIsShowPopup: (arg: boolean) => void
}

export const AddPhotoPopup = ({ isShowPopup, setIsShowPopup }: IAddPhotoPopup) => {
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)

  const closePopup = () => setIsShowPopup(false)

  const uploadPhoto = () => {
    alert('upload...')
    setIsLoadingPhoto(true)
  }

  const savePhoto = () => {
    alert('save...')
    closePopup()
    setIsLoadingPhoto(false)
  }

  return (
    <Popup title="Add profile photo" show={isShowPopup} modalOnClick={closePopup}>
      <div className={styles.container}>
        {isLoadingPhoto ? <BodySavePhotoPopup onClick={savePhoto} /> : <BodyUploadPhotoPopup onClick={uploadPhoto} />}
      </div>
    </Popup>
  )
}
