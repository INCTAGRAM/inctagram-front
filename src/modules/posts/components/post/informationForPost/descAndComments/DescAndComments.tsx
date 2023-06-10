import styles from '@/modules/posts/components/post/informationForPost/InformationForPost.module.scss'

type Props = {
  avatar: string
  usernameInPath: string
  description: string
}

export const DescAndComments = ({ avatar, usernameInPath, description }: Props) => {
  return (
    <div className={styles.descAndComments}>
      <div className={styles.desc}>
        <img src={avatar} alt="" />
        <p>
          <span>{usernameInPath}</span>
          {description}
        </p>
      </div>
    </div>
  )
}
