import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function PUT(request) {
  const body = await request.json();
  const { id, title, units } = body;
  try {
    const result = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        title,
        units: {
          set: {
            id: units,
          }
        }
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}