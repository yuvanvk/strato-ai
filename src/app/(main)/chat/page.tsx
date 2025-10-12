"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggler } from "@/components/ui/theme-toggler";


export default function ChatPage() {
   
    const { state } = useSidebar();

    return <div>
        <div className="absolute top-4 right-5">
            <ThemeToggler />
        </div>
        <ChatInput />
        {state === "collapsed" && 
            <div className="absolute top-2 left-2">
                <SidebarTrigger />
            </div>
        }
    </div>
}