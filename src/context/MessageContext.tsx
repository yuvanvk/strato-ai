import { createContext } from "react";

export type Message = {
  message: string;
  role: "ai" | "user";
};

export const MessageContext = createContext<{
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}>({
  messages: [],
  setMessages: () => {},
});
