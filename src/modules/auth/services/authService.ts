import {
  ILoginData,
  ITokenResponse,
  INewPasswordData,
  IRegistrationData,
  IRecoveryData,
} from '@/modules/auth/services/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '@/helpers/config'

export const authService = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: baseQueryWithReauth,
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
    loginGoogle: build.mutation<any, { code: string }>({
      query: (body) => ({
        url: '/auth/google/sign-in',
        method: 'POST',
        body,
      }),
    }),
    registration: build.mutation<void, IRegistrationData>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    resendingConfirmation: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
    passwordRecovery: build.mutation<void, IRecoveryData>({
      query: (body) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: build.mutation<void, INewPasswordData>({
      query: (body) => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useRegistrationMutation,
  useResendingConfirmationMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
  useLogoutMutation,
} = authService