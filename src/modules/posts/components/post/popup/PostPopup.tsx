import { IPost } from '@/modules/posts/services/types'

type Props = {
  post: IPost | null
  setPost: (post: IPost) => void
}

export const PostPopup = ({ post }: Props) => {
  if (post) {
    return <div>{post.id}</div>
  }
  return null
}
