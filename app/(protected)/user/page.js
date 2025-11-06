'use client';
import { useSearchParams } from 'next/navigation';

export default function UserPanel() {
  const searchParams = useSearchParams();
  const permissions = searchParams.get('p').split(',');
  return (
    <div>
      <h1>Got such params: {permissions}</h1>
    </div>
  );
}