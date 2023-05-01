import styles from './CroppingPhotoPopup.module.scss'
import { Popup } from '@/common/ui/popup/Popup'
import Cropper, { Area } from 'react-easy-crop'
import React, { useState } from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { IPost } from '@/features/popups/createPostPopup/types'
import { generateDownload } from '@/utils'
import { ControlElement } from './controlElement/ControlElement'
import { AspectControl } from './controlElement/aspectControl/AspectControl'
import { ControlSlider } from './controlElement/controlSlider/ControlSlider'

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
          <AspectControl setAspect={setAspect} />
        </ControlElement>
        <ControlElement icon={'maximize-outline'} elementClass={'zoom'}>
          <ControlSlider zoom={zoom} setZoom={setZoom} />
        </ControlElement>
        <ControlElement icon={'image-outline'} elementClass={'gallery'}></ControlElement>
      </div>
    </Popup>
  )
}
