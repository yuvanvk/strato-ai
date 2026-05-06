import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
import { polarClient } from "@polar-sh/better-auth"; 


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [polarClient()]
});

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/chat"
  });
}

export const signOut = async () => {
  await authClient.signOut();
  redirect("/chat")
} 



export const checkOut = async () => {
  
  await authClient.checkout({
    slug: "pro"
  });
}
