import { IPosts } from '@/features/popups/createPostPopup/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialPostsState: IPosts = {
  page: 1,
  refetchWithSameParams: false,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    refatchPosts(state, action: PayloadAction<boolean>) {
      state.refetchWithSameParams = action.payload
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { changePage, refatchPosts } = postsSlice.actions
