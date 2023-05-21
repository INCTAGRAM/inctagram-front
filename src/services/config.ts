import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { AppState } from '@/services/redux/store'
import { addToken, stopRefresh } from '@/services/redux/tokenReducer'
import { setLoading } from '@/services/redux/appReducer'

const endpointsSkipAuth = [
  'login',
  'registration',
  'resendingConfirmation',
  'passwordRecovery',
  'createNewPassword',
  'logout',
]

const endpointsSkipLoading = ['getPostsProfile']

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
  if (!endpointsSkipLoading.find((endpoint) => endpoint === api.endpoint)) {
    api.dispatch(setLoading(true))
  }

  let result = await baseQuery(args, api, extraOptions)

  if (!endpointsSkipLoading.find((endpoint) => endpoint === api.endpoint)) {
    api.dispatch(setLoading(false))
  }

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
        if (!endpointsSkipLoading.find((endpoint) => endpoint === api.endpoint)) {
          api.dispatch(setLoading(true))
        }

        result = await baseQuery(args, api, extraOptions)

        if (!endpointsSkipLoading.find((endpoint) => endpoint === api.endpoint)) {
          api.dispatch(setLoading(false))
        }
      } else {
        api.dispatch(addToken(null))
      }
    }

    api.dispatch(stopRefresh(false))
  }
  return result
}
