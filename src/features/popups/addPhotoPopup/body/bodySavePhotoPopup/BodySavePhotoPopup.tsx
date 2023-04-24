import styles from './BodySavePhotoPopup.module.scss'
import { Button } from '@/common/ui/button/Button'
import Cropper, { Area } from 'react-easy-crop'
import { useState } from 'react'
import { generateDownload } from '@/utils'
import { addUserPhoto } from '@/utils'

interface IBodySavePhotoPopup {
  savePhoto: () => void
  file: string
}

export type CroppedAreaType = { width: number; height: number; x: number; y: number }

export const BodySavePhotoPopup = ({ savePhoto, file }: IBodySavePhotoPopup) => {
  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const onClickHandler = () => {
    console.log('croppedArea', croppedArea)
    generateDownload(file, croppedArea, addUserPhoto)
    savePhoto()
  }

  return (
    <div className={styles.container_content}>
      <div className={styles.container_photo}>
        <div className={styles.photo}>
          <Cropper
            image={file as string}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        {/*<Image src={Subtract} width={332} height={340} alt={'subtract'} className={styles.photo_subtract} />*/}
        {/*<Image src={file ? file : defaultAva} width={332} height={340} alt={'ava'} className={styles.photo} />*/}
      </div>
      <Button onClick={onClickHandler}>Save</Button>
    </div>
  )
}
