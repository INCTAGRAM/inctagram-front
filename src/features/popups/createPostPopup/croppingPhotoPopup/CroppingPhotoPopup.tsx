import styles from './CroppingPhotoPopup.module.scss'
import { Popup } from '@/common/ui/popup/Popup'
import Cropper, { Area } from 'react-easy-crop'
import React, { useEffect, useState } from 'react'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { ICrop, ICroppingParameters, IPost } from '@/features/popups/createPostPopup/types'
import { ControlElement } from './controlElement/ControlElement'
import { AspectControl } from './controlElement/aspectControl/AspectControl'
import { ControlSlider } from './controlElement/controlSlider/ControlSlider'
import { GalleryControl } from './controlElement/galleryControl/GalleryControl'
import { postInitial } from '@/features/popups/createPostPopup/CreatePostPopup'
import { SliderControlElements } from '@/features/popups/createPostPopup/croppingPhotoPopup/sliderControlElements/SliderControlElements'
import { generateImages } from '@/features/popups/createPostPopup/utils/generateImages'

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
  const [crop, setCrop] = useState<ICrop>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (post.croppingParameters[post.activeImage]) {
      setCrop(post.croppingParameters[post.activeImage].crop)
      setZoom(post.croppingParameters[post.activeImage].zoom)
      setAspect(post.croppingParameters[post.activeImage].aspect)
    }
  }, [post.croppingParameters, post.activeImage])

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const prevStep = () => {
    setPost(postInitial)
    setIsShowCroppingPhotoPopup(false)
    setIsShowAddPost(true)
  }

  const nextStep = async (images: string[], croppingParameters: ICroppingParameters[]) => {
    if (images.length !== croppingParameters.length) {
      const cropImages = await generateImages(images, [...croppingParameters, { crop, croppedArea, aspect, zoom }])
      setPost({ ...post, images: cropImages })
    } else {
      const cropImages = await generateImages(images, croppingParameters)
      setPost({ ...post, images: cropImages })
    }
  }

  return (
    <Popup
      title="Cropping"
      show={isShowCroppingPhotoPopup}
      modalOnClick={() => nextStep(post.originalImages, post.croppingParameters)}
      modalOnClickPrevStep={prevStep}
      onclickContent={'Next'}
      className={styles.croppingPopup}
    >
      <div className={styles.croppingImages}>
        <SliderControlElements
          direction={'back'}
          post={post}
          setPost={setPost}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          croppedArea={croppedArea}
        />
        {post.originalImages?.map((img, i) => {
          const position = (i - post.activeImage) * 100
          return (
            <div
              key={i}
              className={post.activeImage ? `${styles.croppingImage} ${styles.active}` : styles.croppingImage}
              style={{ left: `${position}%` }}
            >
              <Cropper
                image={img}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape="rect"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
              />
            </div>
          )
        })}
        <SliderControlElements
          direction={'forward'}
          post={post}
          setPost={setPost}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          croppedArea={croppedArea}
        />
        <ControlElement icon={'expand-outline'} elementClass={'aspect'}>
          <AspectControl setAspect={setAspect} />
        </ControlElement>
        <ControlElement icon={'maximize-outline'} elementClass={'zoom'}>
          <ControlSlider zoom={zoom} setZoom={setZoom} />
        </ControlElement>
        <ControlElement icon={'image-outline'} elementClass={'gallery'}>
          <GalleryControl
            post={post}
            setPost={setPost}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            aspect={aspect}
            setAspect={setAspect}
            croppedArea={croppedArea}
          />
        </ControlElement>
      </div>
    </Popup>
  )
}
