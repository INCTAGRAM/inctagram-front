import styles from './CroppingPhotoPopup.module.scss'
import { Popup } from '@/common/ui/popup/Popup'
import Cropper, { Area } from 'react-easy-crop'
import React, { useEffect, useState } from 'react'
import { CroppedAreaType } from '@/modules/profileSettings/components/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { ICrop, ICroppingParameters } from '@/modules/createPost/components/types'
import { ControlElement } from './controlElement/ControlElement'
import { AspectControl } from '@/modules/createPost/components/croppingPhotoPopup/controlElement/aspectControl/AspectControl'
import { ControlSlider } from '@/modules/createPost/components/croppingPhotoPopup/controlElement/controlSlider/ControlSlider'
import { GalleryControl } from '@/modules/createPost/components/croppingPhotoPopup/controlElement/galleryControl/GalleryControl'
import { SliderControlElements } from '@/modules/createPost/components/croppingPhotoPopup/sliderControlElements/SliderControlElements'
import { generateImages } from '@/modules/createPost/helpers/generateImages'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { addImages, changeCroppingParamsImage, setInitialPostState } from '@/modules/createPost/store/createPostReducer'

interface ICroppingPhotoPopupProps {
  isShowCroppingPhotoPopup: boolean
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
  setIsShowFilterPopup: (isShow: boolean) => void
  setIsShowAddPhotoPopup: (isShow: boolean) => void
}

export const CroppingPhotoPopup = ({
  isShowCroppingPhotoPopup,
  setIsShowAddPhotoPopup,
  setIsShowCroppingPhotoPopup,
  setIsShowFilterPopup,
}: ICroppingPhotoPopupProps) => {
  const dispatch = useAppDispatch()
  const originalImages = useAppSelector((state) => state.createPostReducer.originalImages)
  const croppingParameters = useAppSelector((state) => state.createPostReducer.croppingParameters)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState<ICrop>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (croppingParameters[activeImage]) {
      setCrop(croppingParameters[activeImage].crop)
      setCroppedArea(croppingParameters[activeImage].croppedArea)
      setZoom(croppingParameters[activeImage].zoom)
      setAspect(croppingParameters[activeImage].aspect)
    }
  }, [activeImage])

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const prevStep = () => {
    dispatch(setInitialPostState())
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setAspect(1)
    setIsShowCroppingPhotoPopup(false)
    setIsShowAddPhotoPopup(true)
  }

  const nextStep = async (images: string[], croppingParameters: ICroppingParameters[]) => {
    dispatch(
      changeCroppingParamsImage({
        imageIndex: activeImage,
        croppingParameters: {
          crop,
          croppedArea,
          zoom,
          aspect,
        },
      })
    )
    const cropImages = await generateImages(images, croppingParameters, croppedArea, activeImage)
    dispatch(addImages(cropImages))
    setIsShowCroppingPhotoPopup(false)
    setIsShowFilterPopup(true)
  }

  return (
    <Popup
      title="Cropping"
      show={isShowCroppingPhotoPopup}
      modalOnClick={() => nextStep(originalImages, croppingParameters)}
      modalOnClickPrevStep={prevStep}
      onclickContent={'Next'}
      className={styles.croppingPopup}
    >
      <div className={styles.croppingImages}>
        <SliderControlElements direction={'back'} crop={crop} zoom={zoom} aspect={aspect} croppedArea={croppedArea} />
        {originalImages?.map((img, i) => {
          const position = (i - activeImage) * 100
          return (
            <div
              key={i}
              className={activeImage ? `${styles.croppingImage} ${styles.active}` : styles.croppingImage}
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
          <GalleryControl crop={crop} zoom={zoom} aspect={aspect} croppedArea={croppedArea} />
        </ControlElement>
      </div>
    </Popup>
  )
}
