'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import AdminPanel from '@/components/admin/panel';

export default function Admin() {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  return (
    <div>
      <AdminPanel />
    </div>
  );
}
