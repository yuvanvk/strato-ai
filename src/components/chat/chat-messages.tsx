"use client";

import { MessageContext } from "@/context/MessageContext";
import { useContext } from "react";

export const ChatMessages = () => {
  const { messages } = useContext(MessageContext);

  return (
    <div className="mx-auto max-w-4xl py-10 z-10">
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message.message} className={`${message.role === "ai" ? "flex justify-start" : "flex justify-end"}`}>
            <div
              
              className={`${message.role === "ai" ? "w-full" : "max-w-sm rounded-xl bg-stone-200 px-3 py-2 dark:bg-[#303030]"} mb-10`}
            >
              {message.message}
            </div>
          </div>
        ))}
    </div>
  );
};
