import styles from '../../createPostPopup/croppingPhotoPopup/CroppingPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import { changeActiveImage } from '@/services/redux/createPostReducer'

interface SliderControlElementsProps {
  direction: 'back' | 'forward'
  setImage: () => Promise<void>
}

export const SliderForFilterPhoto = ({ direction, setImage }: SliderControlElementsProps) => {
  const dispatch = useAppDispatch()
  const imagesAfterFilters = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const switchPhoto = async (newPhotoIndex: number) => {
    await setImage()
    dispatch(changeActiveImage(newPhotoIndex))
  }

  if (direction === 'back') {
    return activeIndexImage > 0 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlLeft}`}
        onClick={() => switchPhoto(activeIndexImage - 1)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-back'} size={24} />
      </span>
    ) : null
  } else {
    return activeIndexImage < imagesAfterFilters.length - 1 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlRight}`}
        onClick={() => switchPhoto(activeIndexImage + 1)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-forward'} size={24} />
      </span>
    ) : null
  }
}
