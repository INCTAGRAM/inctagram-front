import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'
import { IPostPatchData, IPostResponse, IPostsRequestData, IPostsResponse } from '@/modules/posts/services/types'

export const postsService = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPostsProfile: build.query<IPostsResponse, IPostsRequestData>({
      query: (params) => ({
        url: '/users/self/posts',
        params,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.page === 1) {
          currentCache.posts = newItems.posts
          currentCache.count = newItems.count
        } else if (currentCache.count !== newItems.count) {
          currentCache.count = newItems.count
        } else {
          currentCache.posts.push(...newItems.posts)
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg && previousArg) {
          return currentArg.page !== previousArg.page
        } else {
          return false
        }
      },
      providesTags: ['Posts'],
    }),
    getPostProfile: build.query<IPostResponse, string>({
      query: (postId) => ({
        url: `/users/self/posts/${postId}`,
      }),
    }),
    patchProfilePost: build.mutation<null, IPostPatchData>({
      query: ({ body, id }) => ({
        url: `/users/self/posts/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteProfilePost: build.mutation({
      query(postId) {
        return {
          url: `/users/self/posts/${postId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetPostsProfileQuery,
  useGetPostProfileQuery,
  usePatchProfilePostMutation,
  useDeleteProfilePostMutation,
} = postsService
