import { NextResponse } from "next/server";

import prisma from "@/libs/prisma";

export async function POST(req) {
    const { name, email } = await req.json();
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    return NextResponse.json(user);
}