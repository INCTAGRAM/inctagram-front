import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'
import { endpointsSkipErrorHandling, endpointsSkipLoading } from '@/constants/routes'

const initialState = {
  isLoading: false,
  isGlobalLoading: false,
  errorAlert: null as null | string,
  successAlert: null as null | string,
  isClearState: false,
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
    clearState(state, action: PayloadAction<boolean>) {
      state.isClearState = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending')
        },
        (state, action) => {
          if (endpointsSkipLoading.find((endpointName) => endpointName === action.meta.arg.endpointName)) return
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/fulfilled')
        },
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          state.isLoading = false
          if (endpointsSkipErrorHandling.find((endpointName) => endpointName === action.meta.arg.endpointName)) return
          if (action.payload.data) {
            state.errorAlert = action.payload.data.message[0]
          } else {
            state.errorAlert = action.payload.error
          }
        }
      )
  },
})

export const appReducer = appSlice.reducer

export const { setIsGlobalLoading, setErrorAlert, setSuccessAlert, clearState } = appSlice.actions
