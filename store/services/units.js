import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const unitsApi = createApi({
  reducerPath: 'unitsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/supply/units/' }),
  tagTypes: ['Units'],
  endpoints: builder => ({
    getAllUnits: builder.query({
      query: () => 'get-all',
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
        url: 'create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Units', id: 'LIST' }],
    }),
    deleteUnit: builder.mutation({
      query: id => ({
        url: `delete?id=${id}`,
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