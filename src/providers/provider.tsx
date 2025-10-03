import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const Provider = ({ children }: { children: React.ReactNode }) => (
  
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#f9fafb] dark:bg-[#202020] !shadow-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
);
