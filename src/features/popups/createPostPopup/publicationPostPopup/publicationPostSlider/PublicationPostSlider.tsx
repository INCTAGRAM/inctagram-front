import styles from './PublicationPostSlider.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'

import { changeActiveImage } from '@/services/redux/createPostReducer'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'

interface SliderControlElementsProps {
  direction: 'back' | 'forward'
}

export const PublicationPostSlider = ({ direction }: SliderControlElementsProps) => {
  const dispatch = useAppDispatch()
  const imagesAfterFilters = useAppSelector((state) => state.createPostReducer.images)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const switchPhoto = async (newPhotoIndex: number) => {
    dispatch(changeActiveImage(newPhotoIndex))
  }

  if (direction === 'back') {
    return activeIndexImage > 0 ? (
      <span className={`${styles.controlIcon} ${styles.controlLeft}`} onClick={() => switchPhoto(activeIndexImage - 1)}>
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-back'} size={24} />
      </span>
    ) : null
  } else {
    return activeIndexImage < imagesAfterFilters.length - 1 ? (
      <span
        className={`${styles.controlIcon} ${styles.controlRight}`}
        onClick={() => switchPhoto(activeIndexImage + 1)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-forward'} size={24} />
      </span>
    ) : null
  }
}
