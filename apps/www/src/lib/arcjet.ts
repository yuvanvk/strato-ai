import arcjet, { tokenBucket } from "@arcjet/next";
import { NextRequest } from "next/server";

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


export const getArcjetTokens = async (userId: string, req: NextRequest): Promise<number> => {
    const decision = await aj.protect(req, { userId, requested: 1});

    // if(decision.isDenied()) return 0;

    let remainingTokens;
    if(decision.reason.isRateLimit()) remainingTokens = decision.reason.remaining;
    if(remainingTokens === undefined) remainingTokens = 0;
    
    return remainingTokens;
}