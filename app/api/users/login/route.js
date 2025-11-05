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
    user.permissions = user.permissions.map(permission => permission.key);
    return NextResponse.json(
      {
        token: jwt.sign(
          {
            id: user.id,
            name: user.name,
            role: user.role,
            permissions: user.permissions,
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

export async function GET() {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: 'JWT secret not configured' },
        { status: 500 },
      );
    }
    return NextResponse.json(secret, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
