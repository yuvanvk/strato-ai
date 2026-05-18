"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { Role } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { ChangeEvent, useState } from "react";
import { useMessages } from "@/store/useMessage";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { toast } from "sonner";


export const ChatInput = () => {

  const { addMessage, updateMessage } = useMessages();
  const [input, setInput] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const hasInput = input.length > 0;

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  async function handleAIResponse() {

    addMessage({ id: "new-user-message", role: "user" as Role, content: input });
    setLoading(true)
    addMessage({ id: "new-ai-message", role: "assistant" as Role, content: "" });

    setInput("");
    try {
      // sending a request for ai response.
      const response = await fetch("http://localhost:8787/api/v1/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          model: "@cf/moonshotai/kimi-k2.6",
          message: input,
        }),
      });

      if(!response.ok) {
        throw new Error("Something went wrong")
      }
      
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break
        }
        
        const chunk = decoder.decode(value, { stream: true })

        for (const line of chunk.split("\n")) {
          const trimmed = line.trim()
          if(!trimmed.startsWith("done:")) continue;

          const data = JSON.parse(trimmed.slice(5).trim())

          if(data.token) {
            updateMessage({ token: data.token })
          }
          if (data.userMessageId) {
            updateMessage({ id: "new-user-message", setId: data.userMessage })
          } 
          if (data.assistantMessageId) {
            updateMessage({ id: "new-ai-message", setId: data.assistantMessageId })
          }
        }
      }
      

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <motion.div
      className={cn(
        "flex flex-col rounded-xl border border-[#171616] dark:bg-[#121212] max-w-3xl w-full mx-auto fixed bottom-1 left-1/2 -translate-x-1/2",
      )}
    >
      <div className="bg-black border border-neutral-900 p-4 rounded-xl">
        <Textarea
          rows={1}
          value={input}
          placeholder="Ask anything..."
          onChange={handleChange}
          className={cn(
            "bg-transparent! border-none focus:ring-0! p-0! text-[16px]! resize-none! min-h-0! rounded-none",
          )}
        />
      </div>

      <div className={cn("flex items-center justify-between p-1.5")}>
        <Button size={"icon-lg"} variant={"ghost"}>
          <Plus className="text-neutral-400" />
        </Button>

        <Button
          size={"icon"}
          disabled={!hasInput}
          onClick={handleAIResponse}
          className={cn("bg-neutral-800 text-neutral-200")}
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
      </div>
    </motion.div>
  );
};
