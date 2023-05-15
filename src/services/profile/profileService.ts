import {
  IAddPostResponse,
  IProfileData,
  IProfileResponse,
  IProfileSettingResponse,
  IUploadAvatarResponse,
} from '@/services/profile/types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '@/services/config'

export const profileService = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
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
    updateUserProfile: build.mutation<IProfileSettingResponse, IProfileData>({
      query: (body) => ({
        url: '/users/self/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    addPostProfile: build.mutation<IAddPostResponse, FormData>({
      query: (body) => ({
        url: '/users/self/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useCheckUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
  useAddPostProfileMutation,
} = profileService
