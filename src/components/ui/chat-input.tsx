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

  return (
    <Form {...form}>
      <form className="absolute bottom-5 left-1/2 mx-auto w-full max-w-3xl -translate-x-[50%] rounded-lg border bg-[#5522F6]/5 p-2 dark:border-zinc-800" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  {...field}
                  rows={4}
                  className="w-full resize-none p-1 outline-none focus:ring-0 focus:border-transparent "
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
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="min-w-sm bg-stone-100 dark:bg-zinc-800 rounded-lg shadow-none">
                      <SelectGroup>
                        <SelectLabel>Free Models</SelectLabel>
                        {MODELS.map((model) => (
                          <SelectItem value={model.value} key={model.name} className={`
                            data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5728f4] data-[state=checked]:to-[#5100FF] data-[state=checked]:text-white
                          `}>
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
