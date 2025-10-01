import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./sidebar";

export const AppSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          <img src="/strato.svg" className="h-8 w-8" />
          <SidebarTrigger />
        </div>

        <Button className="bg-gradient-to-b from-[#5728f4] to-[#5100FF] hover:opacity-90 text-white rounded-[10px] text-[15px] [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] cursor-pointer py-5">
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <Button variant="secondary">Sign In</Button>
      </SidebarFooter>
    </Sidebar>
  );
};
