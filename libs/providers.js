'use client';
import { Provider } from 'react-redux';

import { store } from '@/store/store';
import { HeroUIProvider } from '@heroui/react';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </Provider>
  );
}