import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    return NextResponse.json(
      {
        token: jwt.sign(
          {
            id: user.id,
            name: user.name,
            permissions: user.permissions.map(p => p.key),
          },
          process.env.JWT_SECRET,
          { expiresIn: '30d' },
        ), 
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}