import { Button } from "./button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "./sidebar"

export const AppSidebar = () => {
    return <Sidebar variant="inset">
        <SidebarHeader className="space-y-2">
                <div className="flex items-center gap-1 justify-between">
                    <img src="/strato.svg" className="w-8 h-8"/>
                    <SidebarTrigger size={"lg"} />
                </div>

                <Button variant="outline" size="sm" className="rounded-lg  border-1 border-gray-950">New Chat</Button>
        </SidebarHeader>
        <SidebarContent>

        </SidebarContent>
        <SidebarFooter>
            <Button variant="secondary">Login</Button>
        </SidebarFooter>
    </Sidebar>
}