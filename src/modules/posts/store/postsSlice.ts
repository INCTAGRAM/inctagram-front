import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialPostsState = {
  page: 1,
  pageSize: 12,
  isRefetchingPosts: false,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    changePageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
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
export const { changePage, changePageSize, refetchSelfPosts, setInitialPostsState } = postsSlice.actions
