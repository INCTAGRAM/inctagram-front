import { IPosts } from '@/features/popups/createPostPopup/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialPostsState: IPosts = {
  page: 1,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    changePage(state, action: PayloadAction<number | 'initialRefetch'>) {
      state.page = action.payload
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { changePage } = postsSlice.actions
