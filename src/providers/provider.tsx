"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Toaster } from "@/components/ui/sonner";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#FCFCF9] !p-0 !shadow-none dark:bg-[#191a1a]">
        {isMobile && <div className="absolute left-1 top-2"><SidebarTrigger /></div>}
        {children}
        <Toaster position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  );
};
