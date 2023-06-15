import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createPostReducer } from '@/modules/createPost'
import { authService } from '@/modules/auth'
import { profileService } from '@/modules/profile'
import { tokenReducer } from '@/store/tokenSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { postsReducer } from '@/modules/posts'
import { postsService } from '@/modules/posts'
import { appReducer } from '@/store/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createPostService } from '@/modules/createPost'
import { profileSettingsService } from '@/modules/profileSettings'
import { devicesService } from '@/modules/profileSettings/services/devices/devicesService'

const rootReducer = combineReducers({
  tokenReducer,
  createPostReducer,
  postsReducer,
  appReducer,
  [authService.reducerPath]: authService.reducer,
  [profileService.reducerPath]: profileService.reducer,
  [profileSettingsService.reducerPath]: profileSettingsService.reducer,
  [postsService.reducerPath]: postsService.reducer,
  [createPostService.reducerPath]: createPostService.reducer,
  [devicesService.reducerPath]: devicesService.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware])
      .concat([profileService.middleware])
      .concat([profileSettingsService.middleware])
      .concat([postsService.middleware])
      .concat([createPostService.middleware])
      .concat([devicesService.middleware]),
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
