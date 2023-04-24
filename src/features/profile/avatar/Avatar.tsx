import AvatarIco from './../../../../public/avatar-ico.png'
import styles from './Avatar.module.scss'
import Image from 'next/image'

interface IAvatarProps {
  avatar: IAvatar
}

interface IAvatar {
  url: string
  previewUrl: string
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
