import {
  IProfileData,
  IProfileResponse,
  IProfileSettingResponse,
  IUploadAvatarResponse,
} from '@/services/profile/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const profileService = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' }),
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
  }),
})

export const { useCheckUserProfileQuery, useUpdateUserProfileMutation, useUploadAvatarMutation } = profileService

// export const profileService = {
//   checkUserProfile: () => {
//     return instance.get<IProfileResponse>(`/users/self/profile`).then((response) => response.data)
//   },
//   uploadAvatar: (payload: FormData) => {
//     return instance.post<IUploadAvatarResponse>(`/users/self/images/avatar`, payload).then((response) => response.data)
//   },
//   updateUserProfile: (payload: IProfileData) => {
//     return instance.put<IProfileSettingResponse>(`/users/self/profile`, payload).then((response) => response.data)
//   },
// }
