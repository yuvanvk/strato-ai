"use client"

import { useRouter } from "next/navigation";
import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./sidebar";

export const AppSidebar = () => {
  const router = useRouter();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          <img src="/strato.svg" className="h-8 w-8" />
          <SidebarTrigger />
        </div>

        <Button className="cursor-pointer rounded-[10px] bg-gradient-to-b from-[#5728f4] to-[#5100FF] py-5 text-[15px] text-white [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90">
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <Button onClick={() => router.push("/auth")} variant="secondary" className="cursor-pointer text-[14px] py-5 rounded-xl font-semibold">
          Login
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
