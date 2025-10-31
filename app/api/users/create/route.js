import { NextResponse } from "next/server";

import prisma from '@/prisma';

export async function POST(req) {
    const { name, email } = await req.json();
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: "test",
        },
    });
    return NextResponse.json(user);
}