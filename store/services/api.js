import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Products', 'Users', 'Units', 'Safekeeping', 'Reserved'],
  endpoints: () => ({}),
});
