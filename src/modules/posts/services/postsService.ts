import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'
import {
  IPostsResponse,
  IPostsRequestData,
  IUserPostsRequestData,
  IPostPatchData,
  IPostResponse,
  IUserPostRequestParams,
} from '@/modules/posts/services/types'

export const postsService = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts'],
  keepUnusedDataFor: 60 * 60 * 24,
  endpoints: (build) => ({
    getSelfPostsProfile: build.query<IPostsResponse, IPostsRequestData>({
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
        } else {
          currentCache.posts.push(...newItems.posts)
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg && previousArg) {
          return currentArg.id !== previousArg.id
        } else {
          return false
        }
      },
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    getUserPostsProfile: build.query<IPostsResponse, IUserPostsRequestData>({
      query: (params) => ({
        url: `/users/${params.username}/posts`,
        params: {
          page: params.page,
          pageSize: params.pageSize,
          id: params.id,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.page === 1) {
          currentCache.posts = newItems.posts
          currentCache.count = newItems.count
        } else {
          currentCache.posts.push(...newItems.posts)
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg && previousArg) {
          return currentArg.id !== previousArg.id
        } else {
          return false
        }
      },
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    getSelfPostProfile: build.query<IPostResponse, string>({
      query: (postId) => ({
        url: `/users/self/posts/${postId}`,
      }),
    }),
    getUserPostProfile: build.query<IPostResponse, IUserPostRequestParams>({
      query: ({ username, postId }) => ({
        url: `/users/${username}/posts/${postId}`,
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
    }),
  }),
})

export const {
  useGetSelfPostsProfileQuery,
  useGetUserPostsProfileQuery,
  useGetSelfPostProfileQuery,
  useGetUserPostProfileQuery,
  usePatchProfilePostMutation,
  useDeleteProfilePostMutation,
} = postsService
