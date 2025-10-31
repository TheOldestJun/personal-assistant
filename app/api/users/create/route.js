import { NextResponse } from 'next/server';

import prisma from '@/prisma';
import { UserService } from '@/services/userService';

export async function POST(req) {
  try {
    const { name, email, password, permissions } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Всі поля повинні бути заповнені' },
        { status: 400 },
      );
    }
    const user = await UserService.createUser({
      name,
      email,
      password,
      permissions,
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