import { configureStore } from '@reduxjs/toolkit'
import { createPostReducer } from '@/services/redux/createPostReducer'
import { createWrapper } from 'next-redux-wrapper'
import { authService } from '@/services/auth/authService'

const makeStore = () => {
  return configureStore({
    reducer: {
      createPostReducer,
      [authService.reducerPath]: authService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authService.middleware]),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
