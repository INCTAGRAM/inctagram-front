import { IPosts } from '@/features/popups/createPostPopup/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialPostsState: IPosts = {
  page: 1,
  pageSize: 12,
  postsCount: null,
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
    changePostsCount(state, action: PayloadAction<number>) {
      state.postsCount = action.payload
    },
    refetchPosts(state, action: PayloadAction<boolean>) {
      state.isRefetchingPosts = action.payload
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { changePage, changePageSize, changePostsCount, refetchPosts } = postsSlice.actions
