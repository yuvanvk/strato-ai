import { create } from "zustand";
import { Message, Role } from "@workspace/types";

interface MessageStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (token: string) => void;
}

const useMessages = create<MessageStore>((set, get) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set({ messages: [...get().messages, message] }),
  updateMessage: (token) =>
    set({
      messages: get().messages.map((msg) =>
        msg.role === "assistant" && msg.content.startsWith("currently-streaming:")
          ? { ...msg ,content: msg.content + token }
          : msg,
      ),
    }),
}));

export { useMessages };
