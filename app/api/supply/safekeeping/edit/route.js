import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function PUT(request) {
  const body = await request.json();
  const { id, gok, order, ferro } = body;
  try {
    const result = await prisma.safekeeping.update({
      where: {
        id: id,
      },
      data: {
        gok,
        order,
        ferro,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}