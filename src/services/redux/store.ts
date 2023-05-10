import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { createPostReducer } from '@/services/redux/createPostReducer'
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  createPostReducer,
})

const makeStore = () => {
  return configureStore({ reducer: rootReducer })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
// export type AppDispatch = ReturnType<AppStore['dispatch']>

export const wrapper = createWrapper<AppStore>(makeStore)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// window.store = makeStore