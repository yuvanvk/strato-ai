"use client";

import { useState } from "react";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useMessages } from "@/store/useMessage";

export const Chat = () => {
  const { messages, setMessages } = useMessages();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <ScrollArea className="min-h-[90vh] w-full">
        {messages.map((message) => (
          <div>
            {message.content.startsWith("currently-streaming:")
              ? message.content.replace("currently-streaming:", "")
              : message.content}
          </div>
        ))}
      </ScrollArea>
      <ChatInput />
    </div>
  );
};
