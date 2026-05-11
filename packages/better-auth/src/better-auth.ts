import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@workspace/db";
import { sendEmail } from "./send-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendVerificationEmail: async( { user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      })
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
