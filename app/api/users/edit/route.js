import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function PUT(request) {
  let { id, email, password, name, permissions = [] } = await request.json();
  if (!email || !name) {
    return NextResponse.json(
      {
        error: "Всі обов'язкові поля повинні бути заповнені",
      },
      {
        status: 400,
      },
    );
  }
  try {
    //check if password changed
    if (password) {
      password = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          password,
          name,
          permissions: {
            set: permissions.map(p => ({ key: p })),
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          name,
          permissions: {
            set: permissions.map(p => ({ key: p })),
          },
        },
      });
    }
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
