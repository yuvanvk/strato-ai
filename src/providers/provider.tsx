import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const Provider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#0A0A0A]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  </ThemeProvider>
);
