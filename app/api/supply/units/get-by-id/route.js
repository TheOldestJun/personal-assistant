import { NextResponse } from "next/server";

import  prisma  from "@/prisma";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        const unit = await prisma.product.findUnique({
            where: {
                id: id,
            },
            select:{
                units: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });
        return NextResponse.json({label: unit.units.title, value: unit.units.id}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}