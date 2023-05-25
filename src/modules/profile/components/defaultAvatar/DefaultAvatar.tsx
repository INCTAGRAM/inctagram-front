import styles from './DefaultAvatar.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React from 'react'

const DefaultAvatar = () => {
  return (
    <div className={styles.circle}>
      <div className={styles.block}>
        <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
      </div>
    </div>
  )
}

export default DefaultAvatar
