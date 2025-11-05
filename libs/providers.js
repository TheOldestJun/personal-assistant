'use client';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { login } from '@/store/reducers/authSlice';
import { store } from '@/store/store';
import { HeroUIProvider } from '@heroui/react';
import { decryptJwtWithSecret } from './crypto';
import { getClientSecret } from './secretProvider';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const secret = await getClientSecret();
          const jwt = await decryptJwtWithSecret(secret, token);
          dispatch(login({ token: jwt }));
        } catch (error) {
          console.error('Error decrypting JWT:', error);
          localStorage.removeItem('token');
        }
      }
    }
    getToken();
  }, [dispatch]);
  return <>{children}</>;
};

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </AuthProvider>
    </Provider>
  );
}
