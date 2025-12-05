import { configureStore } from '@reduxjs/toolkit';
//import { ordersApi } from './services/orders';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducers from './reducers/authSlice';
import currentOrderReducers from './reducers/currentsOrderSlice';

import { productsApi } from './services/products';
import { safekeepingApi } from './services/safekeeping';
import { usersApi } from './services/users';

export const store = configureStore({
  reducer: {
    auth: authReducers,
    currentOrder: currentOrderReducers,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [safekeepingApi.reducerPath]: safekeepingApi.reducer,
    //[ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      productsApi.middleware,
      safekeepingApi.middleware,
      //ordersApi.middleware,
    ]),
});
setupListeners(store.dispatch);
