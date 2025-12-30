import { addToast } from '@heroui/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
});

export const baseQueryWithToast = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    addToast({
      title: 'Помилка',
      description:
        result.error?.data?.error?.message || 'Щось пішло не так',
      color: 'danger',
    });
  }

  return result;
};