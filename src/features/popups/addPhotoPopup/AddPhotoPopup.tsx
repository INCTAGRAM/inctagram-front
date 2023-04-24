import Popup from '@/common/ui/popup/Popup'
import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './AddFhotoPopup.module.scss'
import { BodyUploadPhotoPopup } from '@/features/popups/addPhotoPopup/body/bodyUploadPhotoPopup/BodyUploadPhotoPopup'
import { BodySavePhotoPopup } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

interface IAddPhotoPopup {
  isShowPopup: boolean
  setIsShowPopup: (arg: boolean) => void
}

export const AddPhotoPopup = ({ isShowPopup, setIsShowPopup }: IAddPhotoPopup) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [file, setFile] = useState<string>('')
  const closePopup = () => setIsShowPopup(false)

  const uploadPhoto = () => {
    inputRef && inputRef.current?.click()
  }

  const savePhoto = () => {
    closePopup()
    setIsLoadingPhoto(false)
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        setFile(reader.result as string)
      })
      setIsLoadingPhoto(true)
    }
  }

  return (
    <Popup title="Add profile photo" show={isShowPopup} modalOnClick={closePopup}>
      <div className={styles.container}>
        {isLoadingPhoto ? (
          <BodySavePhotoPopup savePhoto={savePhoto} file={file} />
        ) : (
          <BodyUploadPhotoPopup onClick={uploadPhoto} />
        )}
        <input
          type="file"
          name="myImage"
          accept="image/*"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={uploadHandler}
        />
      </div>
    </Popup>
  )
}
