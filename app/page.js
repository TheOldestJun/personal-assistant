'use client';

import { Button } from '@heroui/react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Мій Персональній Асистент
        </h1>
        <Button className="" color="primary">
          Натисніть мене
        </Button>
    </div>
  );
}