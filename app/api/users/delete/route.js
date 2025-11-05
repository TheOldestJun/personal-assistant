import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    let result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      return NextResponse.json(
        { error: 'Такого користувача не існує' },
        { status: 404 },
      );
    }
    result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        message: 'Користувача видалено',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
