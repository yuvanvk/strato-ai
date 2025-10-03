"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const Auth = () => {

    const router = useRouter();

    const handleLogin = async () => {
        await signIn()
    }
    return <div className="h-screen flex items-center justify-center bg-white dark:bg-[#101010] font-mono">
        <div className="flex flex-col items-center space-y-4">
                <img src="/strato.svg" className="w-10 h-10"/>
                <div className="text-2xl font-medium tracking-tight ">Welcome to Strato AI</div>
                <button onClick={handleLogin} className="bg-gradient-to-b from-[#5728f4] to-[#5100FF] hover:opacity-90 text-white min-w-sm py-3 [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] rounded-[15px] flex items-center gap-2 font-medium justify-center cursor-pointer">
                    <FcGoogle size={25}/>
                    Continue with Google
                </button>
                <button onClick={() => router.push("/chat")} className="min-w-sm rounded-[15px] py-3 bg-[#101010] dark:bg-white text-white dark:text-black flex items-center justify-center gap-2 cursor-pointer">
                    <MdOutlineKeyboardArrowLeft size={20}/>
                    Back to home
                </button>
        </div>
    </div>
}