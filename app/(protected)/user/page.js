'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import MainTabs from '@/components/users/MainTabs';

export default function UserPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  const permissions = searchParams.get('p').split(',');

  return (
    <div>
      <MainTabs permissions={permissions} />
    </div>
  );
}
