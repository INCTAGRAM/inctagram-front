import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPostsRequestData } from '@/modules/posts/services/types'

export const initialPostsState = {
  queryParameters: { page: 1, pageSize: 12 } as IPostsRequestData,
  isRefetchingPosts: false,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    changeQueryParameters(state, action: PayloadAction<IPostsRequestData>) {
      state.queryParameters = action.payload
    },
    refetchSelfPosts(state, action: PayloadAction<boolean>) {
      state.isRefetchingPosts = action.payload
    },
    setInitialPostsState() {
      return initialPostsState
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { changeQueryParameters, refetchSelfPosts, setInitialPostsState } = postsSlice.actions
