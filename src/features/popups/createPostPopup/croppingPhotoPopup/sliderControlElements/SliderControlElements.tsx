import { ICrop } from '@/features/popups/createPostPopup/types'
import styles from '../CroppingPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import { changeActiveImage, changeCroppingParamsImage } from '@/services/redux/createPostReducer'

interface SliderControlElementsProps {
  direction: 'back' | 'forward'
  crop: ICrop
  zoom: number
  aspect: number
  croppedArea: CroppedAreaType
}
export const SliderControlElements = ({ direction, crop, zoom, aspect, croppedArea }: SliderControlElementsProps) => {
  const dispatch = useAppDispatch()
  const originalImages = useAppSelector((state) => state.createPostReducer.originalImages)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const switchPhoto = (newPhotoIndex: number) => {
    dispatch(
      changeCroppingParamsImage({
        imageIndex: activeImage,
        croppingParameters: {
          crop,
          croppedArea,
          aspect,
          zoom,
        },
      })
    )
    dispatch(changeActiveImage(newPhotoIndex))
  }

  if (direction === 'back') {
    return activeImage > 0 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlLeft}`}
        onClick={() => switchPhoto(activeImage - 1)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-back'} size={24} />
      </span>
    ) : null
  } else {
    return activeImage < originalImages.length - 1 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlRight}`}
        onClick={() => switchPhoto(activeImage + 1)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-forward'} size={24} />
      </span>
    ) : null
  }
}