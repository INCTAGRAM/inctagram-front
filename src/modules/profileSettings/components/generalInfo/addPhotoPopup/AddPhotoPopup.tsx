import { Popup } from '@/common/ui/popup/Popup'
import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './AddFhotoPopup.module.scss'
import { BodySavePhotoPopup } from '@/modules/profileSettings/components/generalInfo/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { BodyUploadPhotoPopup } from '@/modules/profileSettings/components/generalInfo/addPhotoPopup/body/bodyUploadPhotoPopup/BodyUploadPhotoPopup'

interface IAddPhotoPopup {
  isShowPopup: boolean
  setIsShowPopup: (arg: boolean) => void
}

export const AddPhotoPopup = ({ isShowPopup, setIsShowPopup }: IAddPhotoPopup) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<string>('')
  const closePopup = () => setIsShowPopup(false)

  const uploadPhoto = () => {
    inputRef && inputRef.current?.click()
  }

  const savePhoto = () => {
    closePopup()
    setFile('')
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        setFile(reader.result as string)
      })
    }
  }

  return (
    <Popup title="Add profile photo" show={isShowPopup} modalOnClick={closePopup}>
      <div className={styles.container}>
        {file ? (
          <BodySavePhotoPopup savePhoto={savePhoto} file={file} setFile={setFile} />
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
