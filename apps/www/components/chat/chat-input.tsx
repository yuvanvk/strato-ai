"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { Role } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { ChangeEvent, useState } from "react";
import { useMessages } from "@/store/useMessage";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";

export const ChatInput = () => {
  const { setMessages, addMessage, updateMessage } = useMessages();
  const [input, setInput] = useState<string>("");
  const hasInput = input.length > 0;

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  async function handleAIResponse() {
    addMessage({ role: "user" as Role, content: input })
    addMessage({ role: "assistant" as Role, content: "currently-streaming:" })
    setInput(""); 
    try {
     const response = await fetch("http://localhost:8787/api/v1/ai/chat", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({
          role: "user",
          model: "baidu/cobuddy:free",
          message: input
        })
     }) 

     if(!response.ok) {
      throw new Error("Some thing went wrong")
     }
     const reader = response.body!.getReader()
     const decoder = new TextDecoder();

     while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true })

      for (const line of chunk.split("\n")) {
        const trimmed = line.trim();
        if(!trimmed.startsWith("data:")) continue;

        const data = JSON.parse(trimmed.slice(5).trim());
        if(data.token) {
          updateMessage(data.token)
        }
      }
     }

    } catch (error) {
      
    }
  }

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 p-2 rounded-xl border border-neutral-800 bg-neutral-900 max-w-lg w-full mx-auto",
      )}
    >
      <Button
        size={"icon"}
        className={cn("bg-[#2d2d2c] text-neutral-100 border-neutral-700")}
      >
        <Plus className="text-neutral-100" />
      </Button>

      <motion.div
        layoutId="chat-input-textarea"
        className="w-full"
      >
        <Textarea
          rows={1}
          placeholder="Ask anything..."
          onChange={handleChange}
          className={cn(
            "bg-transparent! border-none focus:ring-0! p-0! ml-2 text-[16px]! resize-none! min-h-0! rounded-none",
          )}
        />
      </motion.div>

      <Button
        size={"icon"}
        disabled={!hasInput}
        onClick={handleAIResponse}
        className={cn("bg-neutral-200")}
      >
        <motion.div
          animate={{ rotate: input ? "-90deg" : "0deg" }}
          transition={{
            type: "spring",
            damping: 13,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
            aria-hidden="true"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </motion.div>
      </Button>
    </motion.div>
  );
};
