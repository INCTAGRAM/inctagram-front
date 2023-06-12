import { forwardRef, Ref } from 'react'
import styles from './ImageField.module.scss'
import instagramStyles from './Instagram.module.css'
import { useAppSelector } from '@/store/store'
import { Nullable } from '@/common/types/Nullable'

type ImageFieldPropsType = {
  imageFile: string
  position: Nullable<number>
}

const Image = ({ imageFile, position }: ImageFieldPropsType, ref: Ref<HTMLImageElement>) => {
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const filterParametrs = useAppSelector((state) => state.createPostReducer.filterParameters)

  const filterClass = filterParametrs[activeIndexImage] || ''

  return (
    <div className={styles.filterImg} style={{ left: `${position}%` }}>
      <img className={`${instagramStyles[filterClass]} ${styles.imageField}`} src={imageFile} alt="" />
      <img className={`${instagramStyles[filterClass]} ${styles.imageFieldHide}`} src={imageFile} alt="" ref={ref} />
    </div>
  )
}

export const ImageField = forwardRef(Image)
