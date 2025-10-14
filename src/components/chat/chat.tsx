"use client";
import { useState } from "react";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggler } from "@/components/ui/theme-toggler";
import { MessageContext } from "@/context/MessageContext";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Message } from "@/context/MessageContext";

export const Chat = () => {

  const { state } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessageContext value={{ messages, setMessages }}>
      <div>
        <ChatMessages />
        <ChatInput />


        <div className="absolute top-4 right-5">
          <ThemeToggler />
        </div>
        {state === "collapsed" && (
          <div className="absolute top-2 left-2">
            <SidebarTrigger />
          </div>
        )}
      </div>
    </MessageContext>
  );
};
