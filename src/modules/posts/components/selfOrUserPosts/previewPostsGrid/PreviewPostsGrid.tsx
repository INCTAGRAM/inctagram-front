import { useRef } from 'react'
import { useAppDispatch } from '@/store/store'
import { IPostsResponse } from '@/modules/posts/services/types'
import { changeQueryParameters } from '@/modules/posts/store/postsSlice'
import { useScrollEvent } from '@/hooks/useScrollEvent'
import styles from './PreviewPostsGrid.module.scss'
import { PreviewPost } from './previewPost/PreviewPost'
import CircularProgress from '@mui/material/CircularProgress'

type Props = {
  data: IPostsResponse | undefined
  isFetching: boolean
}

export const PreviewPostsGrid = ({ data, isFetching }: Props) => {
  const dispatch = useAppDispatch()
  const postsRef = useRef<HTMLDivElement>(null)

  const scrollHandler = () => {
    if (data && data.count !== data.posts.length) {
      const cursor = data.posts[data.posts.length - 1].id
      dispatch(changeQueryParameters({ id: cursor, pageSize: 12 }))

      return true
    } else {
      return false
    }
  }

  useScrollEvent(scrollHandler, postsRef, [data])

  if (!data) return null

  return (
    <>
      <div ref={postsRef} className={styles.posts}>
        {data.posts.map((post) => (
          <PreviewPost post={post} key={post.id} />
        ))}
      </div>
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress size={45} />
        </div>
      )}
    </>
  )
}
