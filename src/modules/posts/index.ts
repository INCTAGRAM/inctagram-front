import { Posts } from './components/Posts'
import { postsReducer } from './store/postsSlice'
import { postsService } from './services/postsService'
import { useGetSelfPostsProfileQuery } from '@/modules/posts/services/postsService'

export { Posts, useGetSelfPostsProfileQuery, postsReducer, postsService }
