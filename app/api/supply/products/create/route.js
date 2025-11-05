import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST(request) {
  const { title, units } = await request.json();
  try {
    const result = await prisma.product.create({
      data: {
        title,
        units,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}