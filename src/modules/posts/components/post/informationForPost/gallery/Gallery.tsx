import styles from './Gallery.module.scss'
import { ImagesPost } from '@/modules/posts/services/types'
import React, { useState } from 'react'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'

type Props = {
  images: ImagesPost[]
}

export const Gallery = ({ images }: Props) => {
  const [activeImg, setActiveImg] = useState(0)

  const changeImageHandler = (isBack: boolean) => {
    isBack && setActiveImg(activeImg - 1)
    !isBack && setActiveImg(activeImg + 1)
  }

  return (
    <div className={styles.gallery}>
      {activeImg > 0 && (
        <button className={`${styles.controlElements} ${styles.backEl}`} onClick={() => changeImageHandler(true)}>
          <IcomoonReact iconSet={iconSet} color={'#fff'} icon="arrow-back-outline" size={25} />
        </button>
      )}
      {images?.map((image, index) => {
        const position = (index - activeImg) * 100
        return <img key={index} src={image.url} style={{ left: `${position}%` }} />
      })}
      {activeImg < images.length - 1 && (
        <button className={`${styles.controlElements} ${styles.nextEl}`} onClick={() => changeImageHandler(false)}>
          <IcomoonReact iconSet={iconSet} color={'#fff'} icon="arrow-forward-outline" size={25} />
        </button>
      )}
    </div>
  )
}
