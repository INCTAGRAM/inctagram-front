import styles from './BodySavePhotoPopup.module.scss'
import { Button } from '@/common/ui/button/Button'
import Cropper, { Area } from 'react-easy-crop'
import React, { useEffect, useState } from 'react'
import { getCroppedImg } from '@/utils'
import { useUploadAvatarMutation } from '@/services/profile/profileService'
import { ErrorSnackbar } from '@/common/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

interface IBodySavePhotoPopup {
  savePhoto: () => void
  file: string
  setFile: (file: string) => void
}

export type CroppedAreaType = { width: number; height: number; x: number; y: number }

export const BodySavePhotoPopup = ({ savePhoto, setFile, file }: IBodySavePhotoPopup) => {
  const [uploadAvatar, { isError, error, isSuccess }] = useUploadAvatarMutation()
  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [errorSize, setErrorSize] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      savePhoto()
    }
  }, [isSuccess])

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const onClickHandler = async () => {
    const canvas = await getCroppedImg(file, croppedArea)
    canvas.toBlob((blob) => {
      const file = new File([blob as Blob], 'fileName.jpg', { type: 'image/jpeg' })

      if (file.size < 2000000) {
        setErrorSize(false)
        const formData = new FormData()
        formData.append('file', file)
        uploadAvatar(formData)
      } else {
        setErrorSize(true)
      }
    }, 'image/jpeg')
  }

  const removeFileHandler = () => {
    setFile('')
  }

  return (
    <div className={styles.container_content}>
      <div className={styles.container_photo}>
        <IcomoonReact
          className={styles.iconClose}
          onClick={removeFileHandler}
          iconSet={iconSet}
          icon="close"
          color={'white'}
          size={35}
        />
        <div className={styles.photo}>
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
      <Button className={styles.saveBtn} onClick={onClickHandler}>
        Save
      </Button>
      {errorSize && <ErrorSnackbar error={'Image size is too big'} />}
      {isError && <ErrorSnackbar error={error as IErrorResponse} />}
    </div>
  )
}
