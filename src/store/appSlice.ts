import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'

const initialState = {
  isLoading: false,
  isGlobalLoading: false,
  errorAlert: null as null | string,
  successAlert: null as null | string,
  isClearCashRTKQuery: false,
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
    clearCashRTKQuery(state, action: PayloadAction<boolean>) {
      state.isClearCashRTKQuery = action.payload
    },
  },
})

export const appReducer = appSlice.reducer

export const { setLoading, setIsGlobalLoading, setErrorAlert, setSuccessAlert, clearCashRTKQuery } = appSlice.actions
