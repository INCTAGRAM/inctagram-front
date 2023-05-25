import styles from './UserInfo.module.scss'
import Image from 'next/image'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React, { FC } from 'react'
import { IProfileResponse } from '@/modules/profile/services/types'

export const UserInfo: FC<PropsType> = ({ userData }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatar}>
        {userData && userData.avatar.previewUrl !== null ? (
          <Image src={userData.avatar.previewUrl} fill alt="avatar" unoptimized priority />
        ) : (
          <div className={styles.imageOutline}>
            <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={36} />
          </div>
        )}
      </div>
      <div className={styles.username}>{userData?.username}</div>
    </div>
  )
}

type PropsType = {
  userData: IProfileResponse
}
