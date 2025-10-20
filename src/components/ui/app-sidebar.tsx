"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./sidebar";
import { CircleUser, LogIn, LogOut, Pencil, Sparkle, Trash2 } from "lucide-react";
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
import { useTheme } from "next-themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { BsThreeDots } from "react-icons/bs";

interface Chat {
  id: string;
  title: string;
  userId: string;
}

export const AppSidebar = () => {
  const [chats, setChats] = useState<Chat[] | []>([]);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { theme } = useTheme();

  const params = useParams<{ id: string }>();

  const createNewChat = async () => {
    try {
      const response = await axios.post("/api/create");
      router.push(`/chat/${response.data.chat.id}`);
    } catch (error) {
      console.log("[APP_SIDEBAR_CREATE_CHAT]", error);
    }
  };

  const getAllUserChats = async () => {
    try {
      const response = await axios.get("/api/chat");

      setChats(response.data.chats);
    } catch (error) {
      console.log("[GET_USER_CHATS]", error);
    }
  };

  console.log(chats);

  useEffect(() => {
    getAllUserChats();
  }, []);

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          <img
            src={`${theme === "light" ? "/logo-light.svg" : "/logo.svg"}`}
            className="h-8 w-8"
          />
          <SidebarTrigger />
        </div>

        <Button
          onClick={createNewChat}
          className="cursor-pointer rounded-[10px] bg-gradient-to-b from-[#5728f4] to-[#5100FF] py-5 text-[15px] text-white [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90"
        >
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {chats.length > 0 ? (
          <div className="flex flex-col space-y-3 py-5 px-1.5">
            {chats.map((chat) => (
              <div
                onClick={() => router.push(`/chat/${chat.id}`)}
                key={chat.id}
                className={cn(
                  "group/chat flex cursor-pointer items-center justify-between px-2 py-2 text-sm font-normal text-white hover:bg-neutral-800 transition rounded-lg",
                  params.id === chat.id && "bg-neutral-800 "
                )}
              >
                <span>{chat.title}</span>
                <span className="opacity-0 group-hover/chat:opacity-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <div className="flex items-center gap-1.5">
                          <Pencil />
                          Rename
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-red-500"/>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground px-3 py-2">No chats</span>
        )}
      </SidebarContent>
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
            <DropdownMenuContent className="rounded-xl bg-[#353535]">
              <DropdownMenuItem disabled className="cursor-pointer">
                <CircleUser />
                {session.user.email}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Sparkle />
                Upgrade
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={async () => await signOut()}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
