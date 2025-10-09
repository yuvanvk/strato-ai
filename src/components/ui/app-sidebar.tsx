"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./sidebar";
import { CircleUser, LogIn, LogOut, Sparkle } from "lucide-react";
import { authClient, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";

export const AppSidebar = () => {
  const router = useRouter();
  const {
    data: session,
    isPending, 
    error, 
    refetch, 
  } = authClient.useSession();

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
        {!session && (
          <button
            onClick={() => router.push("/auth")}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#101010] py-2 font-mono text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            <LogIn size={18} />
            Login
          </button>
        )}
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer items-center justify-between gap-x-2 rounded-xl px-1 py-1 hover:bg-gray-100 dark:hover:bg-neutral-700">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={session.user.image!}
                      alt={session.user.name}
                    />
                    <AvatarFallback>{session.user.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-normal">
                      {session.user.name}
                    </span>
                    <span className="text-muted-foreground text-xs capitalize">
                      free
                    </span>
                  </div>
                </div>
                <Badge variant={"outline"} className="rounded-full">
                  Upgrade
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl bg-[#353535] ">
              <DropdownMenuItem disabled className="cursor-pointer ">
                <CircleUser />
                {session.user.email}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Sparkle />
                Upgrade
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <button className="flex items-center gap-2" onClick={async () => await signOut()}>
                  <LogOut />
                Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
