import AvatarIco from './../../../../public/avatar-ico.png'
import styles from './DefaultAvatar.module.scss'
import Image from 'next/image'

const DefaultAvatar = () => {
  return (
    <div className={styles.circle}>
      <div className={styles.block}>
        <Image src={AvatarIco} alt="" />
      </div>
    </div>
  )
}

export default DefaultAvatar
