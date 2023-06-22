import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/common/types/Nullable'
import { endpointsSkipErrorHandling, endpointsSkipLoading } from '@/constants/routes'
import { authService } from '@/modules/auth'
import { createPostService } from '@/modules/createPost'
import { postsService } from '@/modules/posts'
import { profileService } from '@/modules/profile'
import { devicesService, profileSettingsService } from '@/modules/profileSettings'
import { setInitialPostsState } from '@/modules/posts/store/postsSlice'
import { Dispatch } from 'react'

export const clearAllState = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(authService.util.resetApiState())
  dispatch(createPostService.util.resetApiState())
  dispatch(postsService.util.resetApiState())
  dispatch(profileService.util.resetApiState())
  dispatch(profileSettingsService.util.resetApiState())
  dispatch(devicesService.util.resetApiState())
  dispatch(setInitialPostsState())
  dispatch(addToken(null))
  dispatch(clearStateAndRedirectLogin(false))
}

const initialState = {
  isLoading: false,
  isGlobalLoading: false,
  accessToken: null as null | string,
  errorAlert: null as null | string,
  successAlert: null as null | string,
  isClearStateAndRedirectLogin: false,
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
    addToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    },
    setErrorAlert(state, action: PayloadAction<{ message: Nullable<string> }>) {
      state.errorAlert = action.payload.message
    },
    setSuccessAlert(state, action: PayloadAction<{ message: Nullable<string> }>) {
      state.successAlert = action.payload.message
    },
    clearStateAndRedirectLogin(state, action: PayloadAction<boolean>) {
      state.isClearStateAndRedirectLogin = action.payload
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

export const { addToken, setIsGlobalLoading, setErrorAlert, setSuccessAlert, clearStateAndRedirectLogin } =
  appSlice.actions
