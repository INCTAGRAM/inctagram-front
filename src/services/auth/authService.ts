import { ILoginData, ITokenResponse, INewPasswordData, IRegistrationData, IRecoveryData } from '@/services/auth/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/services/redux/store'

export const authService = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const accessToken = (getState() as AppState).tokenReducer.accessToken

      console.log(endpoint)

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    login: build.mutation<ITokenResponse, ILoginData>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    registration: build.mutation<unknown, IRegistrationData>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    resendingConfirmation: build.mutation<unknown, { email: string }>({
      query: (body) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
    passwordRecovery: build.mutation<unknown, IRecoveryData>({
      query: (body) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: build.mutation<unknown, INewPasswordData>({
      query: (body) => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegistrationMutation,
  useResendingConfirmationMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
} = authService
