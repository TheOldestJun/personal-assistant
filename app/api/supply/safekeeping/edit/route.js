import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function PUT(request) {
  let body = await request.json();
  let { id, gok, order, ferro } = body;
  if (order === ferro) {
    gok -= ferro;
    order = 0;
  }

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
