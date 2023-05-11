import styles from './BodySavePhotoPopup.module.scss'
import { Button } from '@/common/ui/button/Button'
import Cropper, { Area } from 'react-easy-crop'
import { useState } from 'react'
import { generateDownload, getCroppedImg } from '@/utils'
import { useUploadAvatarMutation } from '@/services/profile/profileService'
import axios, { AxiosError } from 'axios/index'

interface IBodySavePhotoPopup {
  savePhoto: () => void
  file: string
}

export type CroppedAreaType = { width: number; height: number; x: number; y: number }

export const BodySavePhotoPopup = ({ savePhoto, file }: IBodySavePhotoPopup) => {
  const [uploadAvatar, { isError, error }] = useUploadAvatarMutation()
  const [croppedArea, setCroppedArea] = useState<CroppedAreaType>({ width: 0, height: 0, x: 0, y: 0 })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  // export const addUserPhoto = async (file: File) => {
  //   if (file.size < 2000000) {
  //     try {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       await profileService.uploadAvatar(formData)
  //     } catch (error) {
  //       const err = error as Error | AxiosError
  //       if (axios.isAxiosError(err)) {
  //         const error = err.response?.data ? err.response.data.message[0] : err.message
  //         console.log(error)
  //       } else {
  //         console.log(`Native error ${err.message}`)
  //       }
  //     }
  //   } else {
  //     console.error('Error: ', 'Файл слишком большого размера')
  //   }
  // }

  const onClickHandler = async () => {
    const canvas = await getCroppedImg(file, croppedArea)
    canvas.toBlob((blob) => {
      const file = new File([blob as Blob], 'fileName.jpg', { type: 'image/jpeg' })

      if (file.size < 2000000) {
        const formData = new FormData()
        formData.append('file', file)
        uploadAvatar(formData)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }, 'image/jpeg')
    // generateDownload(file, croppedArea, addUserPhoto).then(savePhoto)
  }

  return (
    <div className={styles.container_content}>
      <div className={styles.container_photo}>
        <div className={styles.photo}>
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
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
