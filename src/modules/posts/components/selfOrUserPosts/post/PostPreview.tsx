import { RouteNames } from '@/constants/routes'
import styles from '@/modules/posts/components/selfOrUserPosts/Posts.module.scss'
import { LikesCommentsCount } from '@/modules/posts/components/selfOrUserPosts/likesCommentsCount/LikesCommentsCount'
import { GalleryIcon } from '@/modules/posts/components/selfOrUserPosts/gallaryIcon/GalleryIcon'
import Link from 'next/link'
import { IPost } from '@/modules/posts/services/types'
import { useRouter } from 'next/router'

type Props = {
  post: IPost
}

export const PostPreview = ({ post }: Props) => {
  const { asPath } = useRouter()
  const usernameInPath = asPath.split(/[/?]/)[2]

  return (
    <Link
      key={post.id}
      href={{ pathname: `${RouteNames.PROFILE}/${usernameInPath}`, query: { id: post.id } }}
      scroll={false}
    >
      <div className={styles.post}>
        <img src={post.previewUrl} alt={''} />
        <LikesCommentsCount likesCount={0} commentsCount={0} />
        {post.imagesCount > 1 && <GalleryIcon />}
      </div>
    </Link>
  )
}
