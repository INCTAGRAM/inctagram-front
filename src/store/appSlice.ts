import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'

interface IInitialState {
  isLoading: boolean
  errorAlert: Nullable<string>
  successAlert: Nullable<string>
}

const initialState: IInitialState = {
  isLoading: false,
  errorAlert: null,
  successAlert: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setErrorAlert(state, action: PayloadAction<{ message: Nullable<string> }>) {
      state.errorAlert = action.payload.message
    },
    setSuccessAlert(state, action: PayloadAction<{ message: Nullable<string> }>) {
      state.successAlert = action.payload.message
    },
  },
})

export const appReducer = appSlice.reducer

export const { setLoading, setErrorAlert, setSuccessAlert } = appSlice.actions
