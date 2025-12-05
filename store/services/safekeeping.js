import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const safekeepingApi = createApi({
  reducerPath: 'safekeepingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/supply/safekeeping/' }),
  tagTypes: ['Safekeeping'],
  endpoints: builder => ({
    getAllSafekeeping: builder.query({
      query: () => 'get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Safekeeping', id })),
              { type: 'Safekeeping', id: 'LIST' },
            ]
          : [{ type: 'Safekeeping', id: 'LIST' }],
    }),
    createSafekeeping: builder.mutation({
      query: ({ ...data }) => ({
        url: 'create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Safekeeping', id: 'LIST' }],
    }),
    editSafekeeping: builder.mutation({
      query: ({ ...data }) => ({
        url: 'edit',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Safekeeping', id: 'LIST' }],
    }),
    deleteSafekeeping: builder.mutation({
      query: id => ({
        url: `delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Safekeeping', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllSafekeepingQuery,
  useCreateSafekeepingMutation,
  useEditSafekeepingMutation,
  useDeleteSafekeepingMutation,
} = safekeepingApi;
