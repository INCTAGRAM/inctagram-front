import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'

interface IInitialState {
  accessToken: Nullable<string>
}

const initialState: IInitialState = {
  accessToken: null,
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    },
  },
})

export const { addToken } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer
