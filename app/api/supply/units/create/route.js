import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST(request) {
  const { title } = await request.json();
  try {
    const unit = await prisma.unit.create({
      data: {
        title,
      },
    });
    return NextResponse.json(unit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
