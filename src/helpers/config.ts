import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { AppState } from '@/store/store'
import { endpointsSkipAuth } from '@/constants/routes'
import { addToken, clearStateAndRedirectLogin } from '@/store/appSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const accessToken = (getState() as AppState).appReducer.accessToken

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
    if (api.endpoint !== 'refreshToken') {
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
        api.dispatch(clearStateAndRedirectLogin(true))
      }
    }
  }
  return result
}
