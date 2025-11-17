import { betterAuth } from "better-auth";
import { oneTap } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

import prisma from "./prisma";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET as string,
        }),
      ],
    }),
  ],
});
