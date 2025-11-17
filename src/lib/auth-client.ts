import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";



export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [polarClient()]
});

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/chat"
  });
}

export const signOut = async () => {
  const data = await authClient.signOut();
  redirect("/chat")
} 

export const checkOut = async () => {
  const res = await authClient.checkout()
}
