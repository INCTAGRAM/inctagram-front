import { useGetSelfPostProfileQuery } from '@/modules/posts/services/postsService'

type Props = {
  postId: string
}

export const DisplaySelfPostPopup = ({ postId }: Props) => {
  const { data } = useGetSelfPostProfileQuery(postId)

  return <div></div>
}
