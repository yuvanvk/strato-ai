import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await getServerSession();

        if(!user) {
            return NextResponse.json({ message: "Unauthorized, Please Login."}, { status: 401 })
        }

        const chat = await prisma.chat.create({
            data: {
                userId: user.user.id,
                title: "Untitlted"
            }
        })

        return NextResponse.json({ message: "Created Successfully", chat })
    } catch (error) {
        console.log("[CREATE_API]", error)
        return NextResponse.json({ message: "Enable to create chat"}, { status: 404 })
    }
}