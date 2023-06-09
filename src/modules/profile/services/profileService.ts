import { IProfileData, IProfileResponse, IUploadAvatarResponse } from '@/modules/profile/services/types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'

export const profileService = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    getSelfProfile: build.query<IProfileResponse, void>({
      query: () => ({
        url: '/users/self/profile',
      }),
      providesTags: ['Profile'],
    }),
    getUserProfile: build.query<IProfileResponse, { username: string }>({
      query: (params) => ({
        url: `/users/${params.username}/profile`,
      }),
    }),
    uploadAvatar: build.mutation<IUploadAvatarResponse, FormData>({
      query: (body) => ({
        url: '/users/self/profile/avatar',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateUserProfile: build.mutation<void, IProfileData>({
      query: (body) => ({
        url: '/users/self/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useGetSelfProfileQuery, useGetUserProfileQuery, useUpdateUserProfileMutation, useUploadAvatarMutation } =
  profileService
