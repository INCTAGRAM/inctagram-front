import styles from './PreviewsForGalleryControl.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { useSwitchCropPhotoOnSlider } from '@/modules/createPost/hooks/useSwitchCropPhotoOnSlider'
import { useAppSelector } from '@/store/store'
import { MouseEvent } from 'react'
import { useRemoveCropPhotoOnSlider } from '@/modules/createPost/hooks/useRemoveCropPhotoOnSlider'
import { ICroppingParameters } from '@/modules/createPost/components/types'

interface IPreviewsForGalleryControlProps {
  originalImages: string[]
  croppingParameters: ICroppingParameters
}

export const PreviewsForGalleryControl = ({ originalImages, croppingParameters }: IPreviewsForGalleryControlProps) => {
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const { switchPhoto } = useSwitchCropPhotoOnSlider()
  const { removePhoto } = useRemoveCropPhotoOnSlider()

  const switchPhotoHandler = (newPhotoIndex: number) => {
    switchPhoto(newPhotoIndex, activeImage, croppingParameters)
  }

  const removePhotoHandler = (e: MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation()

    removePhoto(e, index, activeImage, croppingParameters)
  }

  return (
    <>
      {originalImages.map((img, i) => {
        return (
          <div className={styles.preview} key={i} onClick={() => switchPhotoHandler(i)}>
            <img src={img} alt={''} />
            {originalImages.length > 1 ? (
              <span className={styles.delPhoto} onClick={(e) => removePhotoHandler(e, i)}>
                <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'close-outline'} size={14} />
              </span>
            ) : (
              ''
            )}
          </div>
        )
      })}
    </>
  )
}
