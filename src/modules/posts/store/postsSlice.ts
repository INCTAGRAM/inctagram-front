import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPostsRequestData } from '@/modules/posts/services/types'

export const initialPostsState = {
  queryParameters: { pageSize: 12 } as IPostsRequestData,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    changeQueryParameters(state, action: PayloadAction<IPostsRequestData>) {
      state.queryParameters = action.payload
    },
    setInitialPostsState() {
      return initialPostsState
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { changeQueryParameters, setInitialPostsState } = postsSlice.actions
