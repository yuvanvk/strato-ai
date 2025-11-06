"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

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
import { useContext, useEffect, useRef } from "react";
import { MessageContext } from "@/context/MessageContext";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";


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
      el.removeEventListener("input", resize);
    };
  }, []);


  const freeModels = MODELS.filter((model) => model.isPremium === false);
  const premiumModels = MODELS.filter((model) => model.isPremium === true);
  const toShow = params.id === undefined;

  return (
    <Form {...form}>
      {toShow && <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-sans tracking-tighter text-center">Ask strato.</div>}
      <motion.form
        className={`${params.id === undefined ? "top-1/2 left-1/2 -translate-y-[50%] ":"bottom-2 md:bottom-5 left-1/2"} absolute -translate-x-[50%]  z-0  md:mx-auto w-full max-w-[96vw]  md:max-w-lg lg:max-w-2xl  rounded-2xl border bg-white dark:bg-[#1F2121] px-4 py-3 dark:border-zinc-800 shadow-xs`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                
                  <textarea
                    {...field}
                    ref={textAreaRef}
                    rows={4}
                    className="w-full resize-none outline-none focus:border-transparent focus:ring-0 font-sans tracking-tight"
                    placeholder="How can I help you today?"
                  />
                  
              </FormControl>
             
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-end gap-x-2 w-full">
                  <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-48  border-none !bg-transparent !px-4 shadow-none focus:outline-none font-sans tracking-tigher">
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
                <Button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-gradient-to-b from-[#5728f4] to-[#5100FF] text-white hover:opacity-90 "
                  >
                    <ArrowUp />
                </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </motion.form>
    </Form>
  );
};
