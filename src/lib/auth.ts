import { betterAuth } from "better-auth";
import { oneTap } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { Polar } from "@polar-sh/sdk";

import {
  polar,
  checkout,
  webhooks,
} from "@polar-sh/better-auth";

import prisma from "./prisma";



console.log(process.env.POLAR_ACCESS_TOKEN);

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000"],
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      afterDelete: async (user, req) => {
        await polarClient.customers.deleteExternal({
          externalId: user.id,
        });
      },
    },
  },
  plugins: [
    oneTap(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "b477a172-c6e7-4f63-a290-50ff1d162f3f",
              slug: "pro",
            },
          ],
          authenticatedUsersOnly: true,
          returnUrl: "http://localhost:3000/chat"
        }),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET as string,
        }),
      ],
    }),
  ],
});







