"use client";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { ThemeToggler } from "../ui/theme-toggler";
import { ChatInput } from "./chat-input";

export const Chat = () => {
  const { state } = useSidebar();

  return (
    <div>
      <div className="absolute top-4 right-5">
        <ThemeToggler />
      </div>
      {state === "collapsed" && (
          <div className="absolute top-2 left-2">
          <SidebarTrigger />
        </div>
      )}
      <ChatInput />
    </div>
  );
};
