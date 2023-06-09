import React from 'react'
import styles from '@/modules/posts/components/post/PostPopup.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'

type Props = {
  closePostPopup: () => void
}

export const ClosePostPopup = ({ closePostPopup }: Props) => {
  return (
    <button className={styles.closePostIcon}>
      <IcomoonReact
        className={styles.closeBtn}
        iconSet={iconSet}
        color={'#fff'}
        icon="close"
        size={32}
        onClick={closePostPopup}
      />
    </button>
  )
}
