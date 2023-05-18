import styles from '@/features/popups/createPostPopup/publicationPostPopup/PublicationPostPopup.module.scss'
import Image from 'next/image'
import React, { FC } from 'react'

export const BodySlider: FC<PropsType> = ({ images, activeImage }) => {
  return (
    <>
      {images?.map((image, index) => {
        const position = (index - activeImage) * 100
        return (
          <div key={index} className={styles.switchImage} style={{ left: `${position}%` }}>
            <Image src={image} alt={'post'} width={486} height={486} />
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
