import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'

interface IInitialState {
  accessToken: Nullable<string>
  stopRefresh: boolean
}

const initialState: IInitialState = {
  accessToken: null,
  stopRefresh: false,
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    },
    stopRefresh(state, action: PayloadAction<boolean>) {
      state.stopRefresh = action.payload
    },
  },
})

export const { addToken, stopRefresh } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer
