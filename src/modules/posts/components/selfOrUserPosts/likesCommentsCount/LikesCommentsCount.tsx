import styles from '../Posts.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

interface ILikesCommentsCountProps {
  likesCount: number
  commentsCount: number
}
export const LikesCommentsCount = ({ likesCount, commentsCount }: ILikesCommentsCountProps) => {
  return (
    <div className={styles.likesAndComments}>
      <span>
        <IcomoonReact iconSet={iconSet} icon="heart" color={'white'} className={styles.icon} size={22} />
        {likesCount}
      </span>
      <span>
        <IcomoonReact iconSet={iconSet} icon="message-circle" color={'white'} className={styles.icon} size={22} />
        {commentsCount}
      </span>
    </div>
  )
}
