import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { AppState } from '@/store/store'
import { addToken, setInitialTokenState, stopRefresh } from '@/store/tokenSlice'
import { endpointsSkipAuth } from '@/constants/routes'
import { clearState } from '@/store/appSlice'

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
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const state = api.getState() as AppState
    if (!state.tokenReducer.stopRefresh) {
      api.dispatch(stopRefresh(true))

      // try to get a new token
      const response = await baseQuery({ url: '/auth/refresh-token', method: 'POST' }, api, extraOptions)
      const data = response.data
      if (data) {
        // store the new token
        if (data instanceof Object && 'accessToken' in data && typeof data.accessToken === 'string') {
          api.dispatch(addToken(data.accessToken))
        }
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(clearState(true))
      }
    }
    api.dispatch(stopRefresh(false))
  }
  return result
}
