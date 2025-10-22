import { getServerSession } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        tokenBucket({
            mode: "LIVE",
            characteristics: ["userId"],
            refillRate: 5,
            interval: 8640,
            capacity: 5,
        }),
    ],
});

export async function GET(req: NextRequest) {
    const user = await getServerSession();
    if(!user) {
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
    }
    const decision = await aj.protect(req, {  userId: user?.session.userId , requested: 1 });
    let remainingTokens = 0;
    if(decision.reason.isRateLimit()) remainingTokens = decision.reason.remaining;

    return NextResponse.json({ remainingTokens });
}
