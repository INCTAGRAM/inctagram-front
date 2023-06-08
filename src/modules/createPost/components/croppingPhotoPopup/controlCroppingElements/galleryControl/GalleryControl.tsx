import { ICrop, ICroppedArea } from '@/modules/createPost/components/types'
import styles from '@/modules/createPost/components/croppingPhotoPopup/controlCroppingElements/ControlCroppingElements.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { ChangeEvent, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useUploadPhotoInCroppingSlider } from '@/modules/createPost/hooks/useUploadPhotoInCroppingSlider'
import { PreviewsForGalleryControl } from '@/modules/createPost/components/croppingPhotoPopup/controlCroppingElements/galleryControl/previewsForGalleryControl/PreviewsForGalleryControl'
import { setErrorAlert } from '@/store/appSlice'

interface IGalleryControlProps {
  crop: ICrop
  zoom: number
  aspect: number
  croppedArea: ICroppedArea
}
export const GalleryControl = ({ crop, zoom, aspect, croppedArea }: IGalleryControlProps) => {
  const dispatch = useAppDispatch()
  const originalImages = useAppSelector((state) => state.createPostReducer.originalImages)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const inpFile = useRef<HTMLInputElement | null>(null)
  const { uploadPhotoInCroppingSlider } = useUploadPhotoInCroppingSlider()

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current.value = ''
    }
  }

  const uploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (originalImages.length >= 10) {
      dispatch(setErrorAlert({ message: "Sorry, you can't add more than 10 pictures." }))
      return
    }

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

  return (
    <div className={`${styles.popupControlElement} ${styles.galleryControlElement}`}>
      <div className={styles.galleryPreviews}>
        <PreviewsForGalleryControl
          originalImages={originalImages}
          croppingParameters={{ crop, croppedArea, zoom, aspect }}
        />
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
