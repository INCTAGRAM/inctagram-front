import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'

interface IInitialState {
  isLoading: boolean
  isGlobalLoading: boolean
  errorAlert: Nullable<string>
  successAlert: Nullable<string>
}

const initialState: IInitialState = {
  isLoading: false,
  isGlobalLoading: false,
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
    setIsGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload
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

export const { setLoading, setIsGlobalLoading, setErrorAlert, setSuccessAlert } = appSlice.actions
