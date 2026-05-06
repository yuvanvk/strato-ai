import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@workspace/db/src";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    })
})