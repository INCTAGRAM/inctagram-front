import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '@/services/config'
import { IAddPostResponse, IPostsRequestData, IPostsResponse } from '@/services/posts/types'

export const postService = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts', 'Post'],
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    addPostProfile: build.mutation<IAddPostResponse, FormData>({
      query: (body) => ({
        url: '/users/self/posts',
        method: 'POST',
        body,
      }),
    }),
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
    }),
    getPostProfile: build.query<any, any>({
      query: (params) => ({
        url: `/users/self/posts/${params.postId}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      forceRefetch() {
        return true
      },
      providesTags: ['Post'],
    }),
  }),
})

export const { useAddPostProfileMutation, useGetPostsProfileQuery, useGetPostProfileQuery } = postService
