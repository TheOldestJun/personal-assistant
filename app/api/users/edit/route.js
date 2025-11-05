import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function PUT(request) {
  let {id, email, password, name, permissions=[]} = await request.json();
  if (
    !email ||
    !password ||
    !name
  ) {
    return NextResponse.json(
      {
        error: 'Всі поля повинні бути заповнені',
      },
      {
        status: 400,
      },
    );
  }
  try {
    //check if password changed
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        password: true,
      },
    });
    if (user.password !== password) {
      password = await bcrypt.hash(password, 10);
    }
    await prisma.user.update({
      where: {
        id
      },
      data: {
        email,
        password,
        name,
        permissions: {
          set: permissions.map(p => ({ id: p })),
        },
      },
    });
    return NextResponse.json(
      {
        message: 'Користувача оновлено',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
