import styles from './CroppingPhotoPopup.module.scss'
import { Popup } from '@/common/ui/popup/Popup'
import Cropper, { Area } from 'react-easy-crop'
import React, { useState } from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { IPost } from '@/features/popups/createPostPopup/types'
import { generateDownload } from '@/utils'
import { ControlElement } from '@/features/popups/createPostPopup/croppingPhotoPopup/controlElement/ControlElement'
import Slider from '@mui/material/Slider'

interface ICroppingPhotoPopupProps {
  post: IPost
  setPost: (post: IPost) => void
  isShowCroppingPhotoPopup: boolean
  setIsShowAddPost: (isShow: boolean) => void
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
}

export const CroppingPhotoPopup = ({
  post,
  setPost,
  isShowCroppingPhotoPopup,
  setIsShowAddPost,
  setIsShowCroppingPhotoPopup,
}: ICroppingPhotoPopupProps) => {
  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const getImages = (file: File) => {
    const url = URL.createObjectURL(file)
    setPost({ ...post, images: [url] })
  }

  const prevStep = () => {
    setPost({ ...post, images: [] })
    setIsShowCroppingPhotoPopup(false)
    setIsShowAddPost(true)
  }
  const nextStep = (images: string[], croppedArea: CroppedAreaType, getImages: (file: File) => void) => {
    generateDownload(images[0], croppedArea, getImages)
  }

  const onChangeSlider = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') setZoom(value / 100)
  }

  return (
    <Popup
      title="Cropping"
      show={isShowCroppingPhotoPopup}
      modalOnClick={() => nextStep(post.images, croppedArea, getImages)}
      modalOnClickPrevStep={prevStep}
      onclickContent={'Next'}
      className={styles.croppingPopup}
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
        <ControlElement icon={'expand-outline'} elementClass={'aspect'}>
          <div className={`${styles.popupControlElement} ${styles.aspectControlElement}`}>
            <p className={styles.sides1_1} onClick={() => setAspect(1)}>
              1:1
            </p>
            <p className={styles.sides4_5} onClick={() => setAspect(4 / 5)}>
              4:5
            </p>
            <p className={styles.sides16_9} onClick={() => setAspect(16 / 9)}>
              16:9
            </p>
          </div>
        </ControlElement>
        <ControlElement icon={'maximize-outline'} elementClass={'zoom'}>
          <div className={`${styles.popupControlElement} ${styles.zoomControlElement}`}>
            <Slider
              size="small"
              defaultValue={100}
              value={zoom * 100}
              onChange={onChangeSlider}
              min={100}
              max={300}
              aria-label="Small"
              valueLabelDisplay="off"
            />
          </div>
        </ControlElement>
        <ControlElement icon={'image-outline'} elementClass={'gallery'}></ControlElement>
      </div>
    </Popup>
  )
}
