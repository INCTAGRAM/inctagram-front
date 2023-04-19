import styles from './BodySavePhotoPopup.module.scss'
import Image from 'next/image'
import defaultAva from 'public/profile/9.jpg'
import Subtract from 'public/profile/Subtract.png'
import { Button } from '@/common/ui/button/Button'

interface IBodySavePhotoPopup {
  onClick: () => void
  file?: File
}

export const BodySavePhotoPopup = ({ onClick, file }: IBodySavePhotoPopup) => {
  const urlFile = URL.createObjectURL(file as File)

  return (
    <div className={styles.container_content}>
      <div className={styles.container_photo}>
        <Image src={Subtract} width={332} height={340} alt={'subtract'} className={styles.photo_subtract} />
        <Image src={file ? urlFile : defaultAva} width={332} height={340} alt={'ava'} className={styles.photo} />
      </div>
      <Button onClick={onClick}>Save</Button>
    </div>
  )
}
