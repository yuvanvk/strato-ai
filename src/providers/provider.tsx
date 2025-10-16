"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#f9fafb] !shadow-none dark:bg-[#202020] !p-0">
        {isMobile && <SidebarTrigger />}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
