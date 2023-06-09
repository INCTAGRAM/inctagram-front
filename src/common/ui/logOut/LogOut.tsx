import { FC } from 'react'
import styles from './LogOut.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

export const LogOut: FC<LogOutPropsType> = ({ onClick, className }) => {
  const finalClassName = `${styles.logout} ${className ? className : ''}`

  return (
    <div onClick={onClick} className={finalClassName}>
      <IcomoonReact iconSet={iconSet} icon={'log-out'} size={16} className={styles.icon} color={'white'} />
      Log Out
    </div>
  )
}

type LogOutPropsType = {
  onClick: () => void
  className?: string
}
