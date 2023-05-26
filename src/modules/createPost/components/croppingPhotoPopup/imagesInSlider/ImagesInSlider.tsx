import { useAppSelector } from '@/store/store'
import { ICrop } from '@/modules/createPost/components/types'
import { CroppedAreaType } from '@/modules/profileSettings/components/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import styles from '@/modules/createPost/components/croppingPhotoPopup/CroppingPhotoPopup.module.scss'
import Cropper, { Area } from 'react-easy-crop'
import React from 'react'

interface IImagesInSlider {
  originalImages: string[]
  crop: ICrop
  zoom: number
  aspect: number
  setCrop: (crop: ICrop) => void
  setZoom: (zoom: number) => void
  setCroppedArea: (croppedArea: CroppedAreaType) => void
}
export const ImagesInSlider = ({
  originalImages,
  crop,
  zoom,
  aspect,
  setCrop,
  setZoom,
  setCroppedArea,
}: IImagesInSlider) => {
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  return (
    <>
      {originalImages?.map((img, i) => {
        const position = (i - activeImage) * 100
        return (
          <div key={i} className={styles.croppingImage} style={{ left: `${position}%` }}>
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropShape="rect"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={false}
            />
          </div>
        )
      })}
    </>
  )
}
