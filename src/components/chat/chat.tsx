"use client";
import { useState } from "react";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggler } from "@/components/ui/theme-toggler";
import { MessageContext } from "@/context/MessageContext";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Message } from "@/context/MessageContext";
import { ScrollArea } from "../ui/scroll-area";

export const Chat = ({ _messages }: { _messages: Message[] }) => {
  const { state } = useSidebar();
  const [messages, setMessages] = useState<Message[]>(_messages);

  return (
    <MessageContext value={{ messages, setMessages }}>
      <div className="h-[95vh] py-10">
        <ScrollArea className="h-[85%]">
          <ChatMessages />
        </ScrollArea>
        <ChatInput />

        <div className="absolute top-4 right-5">
          <ThemeToggler />
        </div>
      </div>
    </MessageContext>
  );
};
