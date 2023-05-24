import { PostsPage } from './components/PostsPage'
import { postsReducer } from './store/postsSlice'
import { postsService } from './services/postsService'
import { useGetPostsProfileQuery } from '@/modules/posts/services/postsService'

export { PostsPage, useGetPostsProfileQuery, postsReducer, postsService }
