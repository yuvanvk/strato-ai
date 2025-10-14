"use client";
import { useState } from "react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { ThemeToggler } from "../ui/theme-toggler";
import { ChatInput } from "./chat-input";
import { MessageContext } from "@/context/MessageContext";

export const Chat = () => {
  const { state } = useSidebar();
  const [messages, setMessages] = useState();

  return (
    <MessageContext value={{ messages, setMessages }}>
      <div>
        <div className="absolute top-4 right-5">
          <ThemeToggler />
        </div>
        {state === "collapsed" && (
          <div className="absolute top-2 left-2">
            <SidebarTrigger />
          </div>
        )}
        <ChatInput />
      </div>
    </MessageContext>
  );
};
