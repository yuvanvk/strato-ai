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
} from "./select";
import { Button } from "./button";
import { ArrowUp } from "lucide-react";
import { MODELS } from "@/lib/data";

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

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="h-4 w-4 text-blue-500"><path d="M229.5,113,166.06,89.94,143,26.5a16,16,0,0,0-30,0L89.94,89.94,26.5,113a16,16,0,0,0,0,30l63.44,23.07L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30ZM157.08,152.3a8,8,0,0,0-4.78,4.78L128,223.9l-24.3-66.82a8,8,0,0,0-4.78-4.78L32.1,128l66.82-24.3a8,8,0,0,0,4.78-4.78L128,32.1l24.3,66.82a8,8,0,0,0,4.78,4.78L223.9,128Z"></path></svg>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Premium Models</SelectLabel>
                        {premiumModels.map((model) => (
                          <SelectItem
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
