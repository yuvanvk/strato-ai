"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ArrowUp, Lock } from "lucide-react";
import { MODELS } from "@/lib/data";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "@/context/MessageContext";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  input: z.string().min(1),
  model: z.string(),
});

export const ChatInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      model: "gemini-2.5-flash",
    },
  });

  const [isExpanded, setIsExpanded] = useState<Boolean>(false);


  const params = useParams<{ id: string }>();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { setMessages } = useContext(MessageContext);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const userMessage = { message: value.input, role: "user" as const };
      setMessages((msg) => [...msg, userMessage]);

      // temporary ai msg
      const aiThinkingMessage = { message: "Thinking", role: "ai" as const };
      setMessages((msg) => [...msg, aiThinkingMessage]);

      const response = await axios.post("/api/chat", {
        message: [{ role: "user", content: value.input }],
        model: value.model,
        id: params.id,
      });

      
      
      const aiMessage = {
        message: response.data.aiResponse,
        role: "ai" as const,
      };

      setMessages((msg) => {
        const updated = [...msg];
        const thinkingMessage = updated.findIndex(
          (m) => m.role === "ai" && m.message === "Thinking",
        );
        if (thinkingMessage !== -1) updated[thinkingMessage] = aiMessage;
        else updated.push(aiMessage);

        return updated;
      });

      form.reset();
    } catch (error: any) {
      console.log("[CHAT_INPUT]", error);
     toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    const resize = () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
     
    };

    el.addEventListener("input", resize);
    resize();

    return () => {
      el.removeEventListener("input", resize)
    };
  }, []);

  const freeModels = MODELS.filter((model) => model.isPremium === false);
  const premiumModels = MODELS.filter((model) => model.isPremium === true);

  return (
    <Form {...form}>
      <div className="absolute top-2 left-2 z-50">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-48 border-none !bg-transparent !px-4 shadow-none">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="min-w-sm rounded-lg bg-stone-100 shadow-none dark:bg-zinc-800">
                    <SelectGroup>
                      <SelectLabel>Free Models</SelectLabel>
                      {freeModels.map((model) => (
                        <SelectItem
                          value={model.value}
                          key={model.name}
                          className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5728f4] data-[state=checked]:to-[#5100FF] data-[state=checked]:text-white"
                        >
                          <model.icon className="mr-2 inline-block" />
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel className="flex items-center gap-2">
                        Premium Models <Lock size={12} />
                      </SelectLabel>
                      {premiumModels.map((model) => (
                        <SelectItem
                          disabled
                          value={model.value}
                          key={model.name}
                          className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5728f4] data-[state=checked]:to-[#5100FF] data-[state=checked]:text-white"
                        >
                          <model.icon className="mr-2 inline-block" />
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <motion.form
        
        className={`absolute bottom-5 left-1/2 z-0 mx-auto w-full max-w-3xl -translate-x-[50%] ${isExpanded ? "rounded-full" : "rounded-full"}  border bg-[#5522F6]/5 p-2 dark:border-zinc-800`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <textarea
                    {...field}
                    ref={textAreaRef}
                    rows={1}
                    className="w-full resize-none px-4 pt-2 outline-none focus:border-transparent focus:ring-0 "
                    placeholder="Ask anything"
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer rounded-full bg-gradient-to-b from-[#5728f4] to-[#5100FF] text-white hover:opacity-90 absolute right-3 top-[50%] -translate-y-1/2"
                  >
                    <ArrowUp />
                  </Button>
                </div>
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
      </motion.form>
    </Form>
  );
};
