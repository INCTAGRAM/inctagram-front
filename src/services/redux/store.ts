import { configureStore } from '@reduxjs/toolkit'
import { createPostReducer } from '@/services/redux/createPostReducer'
import { createWrapper } from 'next-redux-wrapper'
import { authService } from '@/services/auth/authService'
import { profileService } from '@/services/profile/profileService'
import { tokenReducer } from '@/services/redux/tokenReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { postsReducer } from '@/services/redux/postsReducer'

const makeStore = () => {
  return configureStore({
    reducer: {
      tokenReducer,
      createPostReducer,
      postsReducer,
      [authService.reducerPath]: authService.reducer,
      [profileService.reducerPath]: profileService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([authService.middleware, profileService.middleware]),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
