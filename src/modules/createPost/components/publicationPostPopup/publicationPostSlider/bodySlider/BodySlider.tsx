import styles from './BodySlider.module.scss'
import React, { FC } from 'react'

export const BodySlider: FC<PropsType> = ({ images, activeImage }) => {
  return (
    <>
      {images?.map((image, index) => {
        const position = (index - activeImage) * 100
        return (
          <div key={index} className={styles.switchImage} style={{ left: `${position}%` }}>
            <img src={image} alt={'post'} />
          </div>
        )
      })}
    </>
  )
}

type PropsType = {
  images: string[]
  activeImage: number
}
