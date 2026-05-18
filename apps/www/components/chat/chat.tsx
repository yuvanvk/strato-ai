"use client";

import { ChatInput } from "./chat-input";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useMessages } from "@/store/useMessage";
import { MessageCard } from "../card/message.card";
import { motion } from "motion/react";
import { Topbar } from "../navigation/topbar";

export const Chat = () => {
  const { messages, setMessages } = useMessages();
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Topbar />
      <ScrollArea className="min-h-[800px] max-w-3xl mx-auto w-full px-4 py-5 flex flex-col">
        {messages.map((message) => (
          <MessageCard key={message.id} content={message.content} role={message.role} />
        ))}
      </ScrollArea>
      <ChatInput />
    </div>
  );
};
