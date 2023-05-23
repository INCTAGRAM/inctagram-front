import { IProfileData, IProfileResponse, IUploadAvatarResponse } from '@/modules/profile/services/types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '@/helpers/config'

export const profileService = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile', 'Posts', 'Post'],
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    checkUserProfile: build.query<IProfileResponse, void>({
      query: () => ({
        url: '/users/self/profile',
      }),
      providesTags: ['Profile'],
    }),
    uploadAvatar: build.mutation<IUploadAvatarResponse, FormData>({
      query: (body) => ({
        url: '/users/self/images/avatar',
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

export const { useCheckUserProfileQuery, useUpdateUserProfileMutation, useUploadAvatarMutation } = profileService
