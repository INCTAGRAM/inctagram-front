import React from 'react'
import Image from 'next/image'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import s from './Avatar.module.scss'
import { Nullable } from '@/common/types/Nullable'

type AvatarPropsType = {
  previewUrl: Nullable<string> | undefined
}

const Avatar = ({ previewUrl }: AvatarPropsType) => {
  return previewUrl ? (
    <Image src={previewUrl} alt={''} width={24} height={24} />
  ) : (
    <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={s.default_avatar} size={24} />
  )
}

export default Avatar
