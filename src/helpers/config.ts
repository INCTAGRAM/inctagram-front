import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { AppDispatch, AppState } from '@/store/store'
import { addToken, stopRefresh } from '@/store/tokenSlice'
import { setLoading } from '@/store/appSlice'
import { endpointsSkipAuth, endpointsSkipLoading } from '@/constants/routes'
import { authService } from '@/modules/auth'
import { createPostService } from '@/modules/createPost'
import { postsService } from '@/modules/posts'
import { profileService } from '@/modules/profile'

const setIsLoading = (dispatch: AppDispatch, endpoint: string, isTurnOn: boolean) => {
  if (!endpointsSkipLoading.find((endpointName) => endpointName === endpoint)) {
    dispatch(setLoading(isTurnOn))
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const accessToken = (getState() as AppState).tokenReducer.accessToken

    if (accessToken && !endpointsSkipAuth.find((url) => url === endpoint)) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  setIsLoading(api.dispatch, api.endpoint, true)
  let result = await baseQuery(args, api, extraOptions)
  setIsLoading(api.dispatch, api.endpoint, false)

  if (result.error && result.error.status === 401) {
    const state = api.getState() as AppState
    if (!state.tokenReducer.stopRefresh) {
      api.dispatch(stopRefresh(true))

      // try to get a new token
      api.dispatch(setLoading(true))
      const response = await baseQuery({ url: '/auth/refresh-token', method: 'POST' }, api, extraOptions)
      api.dispatch(setLoading(false))
      const data = response.data
      if (data) {
        // store the new token
        if (data instanceof Object && 'accessToken' in data && typeof data.accessToken === 'string') {
          api.dispatch(addToken(data.accessToken))
        }
        // retry the initial query
        setIsLoading(api.dispatch, api.endpoint, true)
        result = await baseQuery(args, api, extraOptions)
        setIsLoading(api.dispatch, api.endpoint, false)
      } else {
        api.dispatch(addToken(null))
        // api.dispatch(authService.util.resetApiState())
        // api.dispatch(createPostService.util.resetApiState())
        // api.dispatch(postsService.util.resetApiState())
        // api.dispatch(profileService.util.resetApiState())
      }
    }
    api.dispatch(stopRefresh(false))
  }
  return result
}
