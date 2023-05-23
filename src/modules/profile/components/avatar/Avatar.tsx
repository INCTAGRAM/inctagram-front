import styles from './Avatar.module.scss'
import Image from 'next/image'
import { Nullable } from '@/common/types/Nullable'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React from 'react'

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
          <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
        </div>
      )}
    </div>
  )
}

export default Avatar
