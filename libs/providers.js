'use client';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { login } from '@/store/reducers/authSlice';
import { store } from '@/store/store';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider, addToast } from '@heroui/react';
import { decryptJwtWithSecret } from './api/crypto';
import { getClientSecret } from './api/secretProvider';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    async function getToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const secret = await getClientSecret();
          const decryptedToken = await decryptJwtWithSecret(secret, token);
          dispatch(login({ token: decryptedToken }));
          const userPermissions = jwt.decode(decryptedToken).permissions;
          if (userPermissions.includes('ADMIN')) {
            router.push('/admin');
          } else
            router.push(`/user?p=${userPermissions.toString().toLowerCase()}`);
        } catch (error) {
          console.error('Error decrypting JWT:', error);
          addToast({
            title: 'Помилка',
            description: `Помилка зчитування JWT: ${error.message}`,
            color: 'danger',
          });
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
        <HeroUIProvider>
          {children}
          <ToastProvider
            placement="top-center"
            toastOffset={60}
            toastProps={{
              radius: 'md',
              color: 'primary',
              variant: 'flat',
              timeout: 2000,
              hideIcon: true,
              classNames: {
                closeButton:
                  'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
              },
            }}
          />
        </HeroUIProvider>
      </AuthProvider>
    </Provider>
  );
}
