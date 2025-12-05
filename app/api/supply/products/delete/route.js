import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    let result = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      return NextResponse.json(
        { error: 'Такого ТМЦ не існує' },
        { status: 404 },
      );
    }
    result = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        message: 'ТМЦ видалено',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
