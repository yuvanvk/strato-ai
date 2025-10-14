"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
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
import axios from "axios";
import { useContext } from "react";
import { MessageContext } from "@/context/MessageContext";

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

  const {message, setMessages} = useContext(MessageContext);


  const onSubmit = async (value: z.infer<typeof formSchema>) => {

    try {
      const response = await axios.post("/api/chat", {
        message: value.input,
        model: value.model
      })



    } catch (error) {
      console.log("[CHAT_INPUT]", error);
    }
  };

  const freeModels = MODELS.filter(model => model.isPremium === false)
  const premiumModels = MODELS.filter(model => model.isPremium === true)

  return (
    <Form {...form}>
      <form
        className="absolute bottom-5 left-1/2 mx-auto w-full max-w-3xl -translate-x-[50%] rounded-lg border bg-[#5522F6]/5 p-2 dark:border-zinc-800"
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
                  rows={4}
                  className="w-full resize-none p-1 outline-none focus:border-transparent focus:ring-0"
                  placeholder="Ask anything"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between p-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="!rounded-xl !px-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="min-w-sm rounded-lg bg-stone-100 shadow-none dark:bg-zinc-800">
                      <SelectGroup>
                        <SelectLabel>Free Models</SelectLabel>
                        {freeModels.map((model) => (
                          <SelectItem
                            value={model.value}
                            key={model.name}
                            className={`data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5728f4] data-[state=checked]:to-[#5100FF] data-[state=checked]:text-white`}
                          >
                            <model.icon />
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel className="flex items-center gap-2">Premium Models <Lock size={12}/></SelectLabel>
                        {premiumModels.map((model) => (
                          <SelectItem disabled
                            value={model.value}
                            key={model.name}
                            className={`data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5728f4] data-[state=checked]:to-[#5100FF] data-[state=checked]:text-white`}
                          >
                            {<model.icon />}
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-gradient-to-b from-[#5728f4] to-[#5100FF] text-white hover:opacity-90"
                  >
                    <ArrowUp />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
