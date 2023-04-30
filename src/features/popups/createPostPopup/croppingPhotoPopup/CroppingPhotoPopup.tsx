import styles from './CroppingPhotoPopup.module.scss'
import { Popup } from '@/common/ui/popup/Popup'
import Cropper, { Area } from 'react-easy-crop'
import { useState } from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { IPost } from '@/features/popups/createPostPopup/types'

interface ICroppingPhotoPopup {
  post: IPost
  setPost: (images: IPost) => void
  isShowCroppingPhotoPopup: boolean
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
  setIsShowFilterPopup: (isShow: boolean) => void
  setIsShowAddPost: (isShow: boolean) => void
}

export const CroppingPhotoPopup = ({
  post,
  setPost,
  isShowCroppingPhotoPopup,
  setIsShowCroppingPhotoPopup,
  setIsShowAddPost,
  setIsShowFilterPopup,
}: ICroppingPhotoPopup) => {
  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)
  console.log(croppedArea)
  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const setBackOnClick = () => {
    setIsShowCroppingPhotoPopup(false)
    setIsShowAddPost(true)
  }

  const setNextOnClick = () => {
    setIsShowCroppingPhotoPopup(false)
    setIsShowFilterPopup(true)
  }
  const closePopup = () => setIsShowCroppingPhotoPopup(false)
  return (
    <Popup
      title="Cropping"
      show={isShowCroppingPhotoPopup}
      modalOnClick={closePopup}
      className={styles.croppingPopup}
      photoPopup={true}
      setBackOnClick={setBackOnClick}
      setNextOnClick={setNextOnClick}
    >
      <div className={styles.croppingImages}>
        {post.images?.map((img, i) => {
          return (
            <Cropper
              key={i}
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropShape="rect"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )
        })}
      </div>
    </Popup>
  )
}
