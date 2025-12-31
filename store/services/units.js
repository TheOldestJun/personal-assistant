import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from './api';

export const unitsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllUnits: builder.query({
      query: () => '/supply/units/get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Units', id })),
              { type: 'Units', id: 'LIST' },
            ]
          : [{ type: 'Units', id: 'LIST' }],
    }),
    createUnit: builder.mutation({
      query: ({ ...data }) => ({
        url: '/supply/units/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Units', id: 'LIST' }],
    }),
    deleteUnit: builder.mutation({
      query: id => ({
        url: `/supply/units/delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Units', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useDeleteUnitMutation,
} = unitsApi;