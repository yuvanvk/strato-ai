import arcjet, { tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 5,
        }),
    ],
});

export async function GET(req: NextRequest) {
    const decision = await aj.protect(req, { requested: 1 });
    console.log("ARCJET DECISION", decision);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return NextResponse.json(
                {
                    error: "Too many requests",
                    reason: decision.reason,
                },
                { status: 429 },
            );
        }
    }

    return NextResponse.json({ message: "Hi there" });
}
