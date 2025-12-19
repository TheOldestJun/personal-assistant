import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function GET() {
  try {
    const units = await prisma.unit.findMany();
    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
