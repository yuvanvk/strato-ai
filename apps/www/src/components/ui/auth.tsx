"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const Auth = () => {
    const router = useRouter();
    const session = authClient.useSession();

    useEffect(() => {
        if (session.data?.session) {
            router.push("/chat");
        }
    }, [session, router])

    const handleLogin = async () => {
        console.log("triggered");
        
        await signIn();
    };
    return (
        <div className="flex h-screen items-center justify-center bg-white font-mono dark:bg-[#101010]">
            <div className="flex flex-col items-center space-y-4">
                <img src="/logo.svg" className="h-10 w-10" />
                <div className="text-2xl font-medium tracking-tight">
                    Welcome to Strato AI
                </div>
                <button
                    onClick={handleLogin}
                    className="flex min-w-sm cursor-pointer items-center justify-center gap-2 rounded-[15px] bg-gradient-to-b from-[#5728f4] to-[#5100FF] py-3 font-medium text-white [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90"
                >
                    <FcGoogle size={25} />
                    Continue with Google
                </button>
                <button
                    onClick={() => router.push("/chat")}
                    className="flex min-w-sm cursor-pointer items-center justify-center gap-2 rounded-[15px] bg-[#101010] py-3 text-white dark:bg-white dark:text-black"
                >
                    <MdOutlineKeyboardArrowLeft size={20} />
                    Back to home
                </button>
            </div>
        </div>
    );
};
