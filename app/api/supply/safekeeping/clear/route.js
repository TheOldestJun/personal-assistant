import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST() {
  try {
    const deleted = await prisma.safekeeping.deleteMany({});
    return NextResponse.json({
      success: true,
      deleted: deleted.count,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
