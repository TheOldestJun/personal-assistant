import { NextResponse } from 'next/server';

import { withErrorHandling } from '@/libs/api/withErrorHandling';
import prisma from '@/prisma';

export const GET = withErrorHandling(async () => {
    const units = await prisma.unit.findMany();
    return NextResponse.json(units, { status: 200 });
}
)