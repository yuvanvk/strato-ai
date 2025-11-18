"use client";

import { Auth } from "@/components/ui/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";


export default async function AuthPage() {

    const session = await authClient.getSession()
    if(session) redirect("/chat")
        
    return <>
        <Auth />
    </>
}