import { ICrop, IPost } from '@/features/popups/createPostPopup/types'
import styles from '../CroppingPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'
import { switchPhotoOnSlider } from '@/features/popups/createPostPopup/utils/switchPhotoOnSlider'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

interface SliderControlElementsProps {
  direction: 'back' | 'forward'
  post: IPost
  setPost: (post: IPost) => void
  crop: ICrop
  zoom: number
  aspect: number
  croppedArea: CroppedAreaType
}
export const SliderControlElements = ({
  direction,
  post,
  setPost,
  crop,
  zoom,
  aspect,
  croppedArea,
}: SliderControlElementsProps) => {
  if (direction === 'back') {
    return post.activeImage > 0 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlLeft}`}
        onClick={() => switchPhotoOnSlider(post.activeImage - 1, post, setPost, crop, zoom, aspect, croppedArea)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-back'} size={24} />
      </span>
    ) : null
  } else {
    return post.activeImage < post.originalImages.length - 1 ? (
      <span
        className={`${styles.sliderControlIcon} ${styles.sliderControlRight}`}
        onClick={() => switchPhotoOnSlider(post.activeImage + 1, post, setPost, crop, zoom, aspect, croppedArea)}
      >
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'arrow-ios-forward'} size={24} />
      </span>
    ) : null
  }
}
