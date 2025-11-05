import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/supply/products/' }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => 'get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    createProduct: builder.mutation({
      query: ({ ...data }) => ({
        url: 'create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    editProduct: builder.mutation({
      query: ({ ...data }) => ({
        url: 'edit',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = productsApi;