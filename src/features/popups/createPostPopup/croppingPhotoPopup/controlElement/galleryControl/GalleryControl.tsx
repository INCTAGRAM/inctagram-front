import { ICrop } from '@/features/popups/createPostPopup/types'
import styles from './../ControlElement.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React, { ChangeEvent, useRef } from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import {
  addImageAndCropParameters,
  removeImageAndCropParameters,
  changeActiveImage,
  changeCroppingParamsImage,
} from '@/services/redux/createPostReducer'

interface IGalleryControlProps {
  crop: ICrop
  setCrop: (crop: ICrop) => void
  zoom: number
  setZoom: (zoom: number) => void
  aspect: number
  setAspect: (aspect: number) => void
  croppedArea: CroppedAreaType
}
export const GalleryControl = ({
  crop,
  setCrop,
  zoom,
  setZoom,
  aspect,
  setAspect,
  croppedArea,
}: IGalleryControlProps) => {
  const dispatch = useAppDispatch()
  const originalImages = useAppSelector((state) => state.createPostReducer.originalImages)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const inpFile = useRef<HTMLInputElement | null>(null)

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current.value = ''
    }
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          dispatch(
            addImageAndCropParameters({
              originalImage: reader.result,
              croppingParameters: {
                crop,
                croppedArea,
                zoom,
                aspect,
              },
            })
          )
          dispatch(changeActiveImage(originalImages.length))
          setCrop({ x: 0, y: 0 })
          setZoom(1)
          setAspect(1)
        }
      }
    }
  }

  const removePhoto = (index: number) => {
    setTimeout(() => {
      dispatch(removeImageAndCropParameters(index))
      if (index <= activeImage) {
        dispatch(changeActiveImage(activeImage - 1))
      }
    }, 30)
  }

  const switchPhoto = (newPhotoIndex: number) => {
    dispatch(
      changeCroppingParamsImage({
        imageIndex: activeImage,
        croppingParameters: {
          crop,
          croppedArea,
          zoom,
          aspect,
        },
      })
    )
    dispatch(changeActiveImage(newPhotoIndex))
  }

  return (
    <div className={`${styles.popupControlElement} ${styles.galleryControlElement}`}>
      <div className={styles.galleryPreviews}>
        {originalImages.map((img, i) => {
          return (
            <div className={styles.preview} key={i} onClick={() => switchPhoto(i)}>
              <img src={img} alt={''} />
              {originalImages.length > 1 ? (
                <span className={styles.delPhoto} onClick={() => removePhoto(i)}>
                  <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'close-outline'} size={14} />
                </span>
              ) : (
                ''
              )}
            </div>
          )
        })}
        <label className={styles.addPhoto}>
          <input
            ref={inpFile}
            type="file"
            name="myImage"
            accept="image/*"
            onClick={clearInputContent}
            onChange={uploadHandler}
          />
          <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'plus-circle-outline'} size={30} />
        </label>
      </div>
    </div>
  )
}
