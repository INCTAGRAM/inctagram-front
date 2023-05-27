import {
  ILoginData,
  ITokenResponse,
  INewPasswordData,
  IRegistrationData,
  IRecoveryData,
} from '@/modules/auth/services/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/helpers/config'

export const authService = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<ITokenResponse, ILoginData>({
      query: (body) => ({
        url: '/auth/login',
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
    signInGitHub: build.mutation<{ accessToken: string }, { code: string }>({
      query: (body) => ({
        url: '/auth/github/sign-in',
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
    refreshToken: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
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
  useLogoutMutation,
  useSignInGitHubMutation,
  useRefreshTokenMutation,
} = authService
