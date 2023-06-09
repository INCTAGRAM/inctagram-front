import styles from '@/modules/posts/components/post/PostPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import React from 'react'

type Props = {
  isShow: boolean
  isNext: boolean
  prevOrNextCallback: (isNext: boolean) => void
}
export const PrevOrNextPostBtn = ({ isShow, isNext, prevOrNextCallback }: Props) => {
  if (!isShow) {
    return null
  }

  if (isNext) {
    return (
      <button className={`${styles.prevOrNextBtn} ${styles.nextBtn}`} onClick={() => prevOrNextCallback(true)}>
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon="arrow-ios-forward" size={30} />
      </button>
    )
  } else {
    return (
      <button className={`${styles.prevOrNextBtn} ${styles.prevBtn}`} onClick={() => prevOrNextCallback(false)}>
        <IcomoonReact iconSet={iconSet} color={'#fff'} icon="arrow-ios-back" size={30} />
      </button>
    )
  }
}
