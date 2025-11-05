import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users/' }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: () => 'get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    createUser: builder.mutation({
      query: ({ ...data }) => ({
        url: 'create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    editUser: builder.mutation({
      query: ({ ...data }) => ({
        url: 'edit',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApi;
