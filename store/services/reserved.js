import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reservedApi = createApi({
  reducerPath: 'reserved',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/supply/reserved/' }),
  tagTypes: ['Reserved'],
  endpoints: builder => ({
    getAllReserved: builder.query({
      query: () => 'get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Reserved', id })),
              { type: 'Reserved', id: 'LIST' },
            ]
          : [{ type: 'Reserved', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllReservedQuery,
} = reservedApi;