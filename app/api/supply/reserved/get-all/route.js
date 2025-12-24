import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function GET() {
  try {
    const reserved = await prisma.reserved.findMany();
    return NextResponse.json(reserved, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
