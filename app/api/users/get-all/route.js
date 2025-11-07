import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        permissions: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}