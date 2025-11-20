import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST(req) {
  try {
    const { name, email, password, permissions = [] } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Всі поля повинні бути заповнені' },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        permissions: permissions
          ? { connect: permissions.map(p => ({ key: p })) }
          : undefined,
      },
      include: {
        permissions: true,
      },
    });
    return NextResponse.json(
      {
        message: `Користувача з email: ${user.email} створено`,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Упс! Щось пішло не так' },
      { status: 500 },
    );
  }
}
