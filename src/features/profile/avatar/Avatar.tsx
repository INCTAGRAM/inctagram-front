import AvatarIco from './../../../../public/avatar-ico.png'
import styles from './Avatar.module.scss'
import Image from 'next/image'
import { Nullable } from '@/common/types/Nullable'

interface IAvatarProps {
  avatar: IAvatar
}

interface IAvatar {
  url: Nullable<string>
  previewUrl: Nullable<string>
}

const Avatar = ({ avatar }: IAvatarProps) => {
  const { url, previewUrl } = avatar

  return (
    <div className={styles.circle}>
      {url && previewUrl ? (
        <Image src={previewUrl} fill alt="profile avatar" unoptimized priority />
      ) : (
        <div className={styles.block}>
          <Image src={AvatarIco} alt="" />
        </div>
      )}
    </div>
  )
}

export default Avatar
