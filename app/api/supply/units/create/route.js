import { NextResponse } from 'next/server';

import { withErrorHandling } from '@/libs/api/withErrorHandling';
import prisma from '@/prisma';

export const POST = withErrorHandling(async (request) => {
  const { title } = await request.json();

  const product = await prisma.unit.create({
    data: {
      title,
    }
  });

  return NextResponse.json(product);
});