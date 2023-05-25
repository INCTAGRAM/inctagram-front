import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'
import { IAddPostResponse } from '@/modules/createPost/services/types'

export const createPostService = createApi({
  reducerPath: 'createPostApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    addPostProfile: build.mutation<IAddPostResponse, FormData>({
      query: (body) => ({
        url: '/users/self/posts',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useAddPostProfileMutation } = createPostService
