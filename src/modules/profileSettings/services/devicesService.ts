import { IDevicesResponse } from '@/modules/profileSettings/services/types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from '@/helpers/config'

export const devicesService = createApi({
  reducerPath: 'devicesService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Devices'],
  endpoints: (build) => ({
    getDevices: build.query<IDevicesResponse[], void>({
      query: () => '/sessions/devices',
      providesTags: ['Devices'],
    }),
    terminateAllOtherSessions: build.mutation<void, void>({
      query: () => ({
        url: '/sessions/devices',
        method: 'DELETE',
      }),
      invalidatesTags: ['Devices'],
    }),
    terminateSession: build.mutation<void, string>({
      query: (id) => ({
        url: `/sessions/devices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Devices'],
    }),
  }),
})

export const { useGetDevicesQuery, useTerminateAllOtherSessionsMutation, useTerminateSessionMutation } = devicesService
