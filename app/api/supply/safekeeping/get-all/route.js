import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function GET() {
  try {
    const products = await prisma.safekeeping.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
