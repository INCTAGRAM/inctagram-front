import { configureStore } from '@reduxjs/toolkit'
import { createPostReducer } from '@/modules/createPost/store/createPostReducer'
import { createWrapper } from 'next-redux-wrapper'
import { authService } from '@/modules/auth/services/authService'
import { profileService } from '@/modules/profile/services/profileService'
import { tokenReducer } from '@/store/tokenSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { postsReducer } from '@/modules/posts/store/postsReducer'
import { postsService } from '@/modules/posts/services/postsService'
import { appReducer } from '@/store/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

const makeStore = () => {
  return configureStore({
    reducer: {
      tokenReducer,
      createPostReducer,
      postsReducer,
      appReducer,
      [authService.reducerPath]: authService.reducer,
      [profileService.reducerPath]: profileService.reducer,
      [postsService.reducerPath]: postsService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([authService.middleware, profileService.middleware, postsService.middleware]),
  })
}

setupListeners(makeStore().dispatch)

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
