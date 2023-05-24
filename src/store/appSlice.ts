import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  isLoading: boolean
}

const initialState: IInitialState = {
  isLoading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const appReducer = appSlice.reducer

export const { setLoading } = appSlice.actions
