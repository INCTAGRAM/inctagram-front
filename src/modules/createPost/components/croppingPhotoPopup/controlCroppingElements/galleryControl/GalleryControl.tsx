import { ICrop } from '@/modules/createPost/components/types'
import styles from '@/modules/createPost/components/croppingPhotoPopup/controlCroppingElements/ControlCroppingElements.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { MouseEvent, ChangeEvent, useRef } from 'react'
import { CroppedAreaType } from '@/modules/profileSettings/components/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { useAppSelector } from '@/store/store'
import { useSwitchCropPhotoOnSlider } from '@/modules/createPost/hooks/useSwitchCropPhotoOnSlider'
import { useUploadPhotoInCroppingSlider } from '@/modules/createPost/hooks/useUploadPhotoInCroppingSlider'
import { useRemoveCropPhotoOnSlider } from '@/modules/createPost/hooks/useRemoveCropPhotoOnSlider'

interface IGalleryControlProps {
  crop: ICrop
  zoom: number
  aspect: number
  croppedArea: CroppedAreaType
}
export const GalleryControl = ({ crop, zoom, aspect, croppedArea }: IGalleryControlProps) => {
  const originalImages = useAppSelector((state) => state.createPostReducer.originalImages)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const inpFile = useRef<HTMLInputElement | null>(null)
  const { switchPhoto } = useSwitchCropPhotoOnSlider()
  const { uploadPhotoInCroppingSlider } = useUploadPhotoInCroppingSlider()
  const { removePhoto } = useRemoveCropPhotoOnSlider()

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current.value = ''
    }
  }

  const uploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    uploadPhotoInCroppingSlider(
      event,
      activeImage,
      {
        crop,
        croppedArea,
        zoom,
        aspect,
      },
      originalImages.length
    )
  }

  const removePhotoHandler = (e: MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation()

    removePhoto(e, index, activeImage, {
      crop,
      croppedArea,
      zoom,
      aspect,
    })
  }

  const switchPhotoHandler = (newPhotoIndex: number) => {
    switchPhoto(newPhotoIndex, activeImage, {
      crop,
      croppedArea,
      aspect,
      zoom,
    })
  }

  return (
    <div className={`${styles.popupControlElement} ${styles.galleryControlElement}`}>
      <div className={styles.galleryPreviews}>
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
