import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
        include: {
            permissions: true,
    },
    });
    if (!user) {
      return NextResponse.json(
        { error: 'Такого користувача не існує' },
        { status: 404 },
      );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Невірний пароль' }, { status: 400 });
    }
    user.permissions = user.permissions.map(permission => permission.key);
    return NextResponse.json(
      {
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}