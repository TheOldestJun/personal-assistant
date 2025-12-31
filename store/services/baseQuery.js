import { addToast } from '@heroui/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const message =
      result.error?.data?.error?.message ||
      'Невідома помилка';

    addToast({
      color: 'danger',
      title: 'Помилка',
      description: message,
    });
  }

  return result;
};
