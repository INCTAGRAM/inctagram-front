import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'
import { IPostsRequestData, IPostsResponse } from '@/modules/posts/services/types'

export const postsService = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
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
    }),
    getPostProfile: build.query<any, any>({
      query: (params) => ({
        url: `/users/self/posts/${params.postId}`,
      }),
    }),
  }),
})

export const { useGetPostsProfileQuery, useGetPostProfileQuery } = postsService