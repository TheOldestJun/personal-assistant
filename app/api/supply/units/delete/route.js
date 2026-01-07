import { NextResponse } from 'next/server';

import { withErrorHandling } from '@/libs/api/withErrorHandling';
import prisma from '@/prisma';

/* export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    await prisma.unit.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Елемент видалено' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} */
export const DELETE = withErrorHandling(async (request) => {
    const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  await prisma.unit.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
});