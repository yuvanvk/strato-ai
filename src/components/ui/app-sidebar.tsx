"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "./sidebar";
import {
  CircleUser,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Search,
  Sparkle,
  Trash2,
} from "lucide-react";
import { authClient, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import { BsThreeDots } from "react-icons/bs";

import { Badge } from "./badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { toast } from "sonner";


interface Chat {
  id: string;
  title: string;
  userId: string;
}

export const AppSidebar = () => {
  const [chats, setChats] = useState<Chat[] | []>([]);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [rename, setRename] = useState<string>("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const { open, toggleSidebar } = useSidebar();
  const { data: session } = authClient.useSession();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const createNewChat = async () => {
    try {
      const response = await axios.post("/api/create");
      router.push(`/chat/${response.data.chat.id}`);
    } catch (error: any) {
    
      console.log("[APP_SIDEBAR_CREATE_CHAT]", error);
      toast.error(`${error.response.data.message}`)
    }
  };

  const getAllUserChats = async () => {
    try {
      const response = await axios.get("/api/chat");
      setChats(response.data.chats);
    } catch (error: any) {
      console.log("[GET_USER_CHATS]", error);
      toast.error(`${error.response.data.message}`)
    }
  };

  const handleDelete = async (chatId: string) => {
    try {
      await axios.delete(`/api/chat?id=${chatId}`);
      getAllUserChats();
    } catch (error: any) {
      console.log("[HANDLE_DELETE]", error);
      toast.error(`${error.response.data.message}`)
    }
  };

  const handleEdit = async (chatId: string, currentName: string) => {
    setEditingChatId(chatId);
    setRename(currentName);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 300);
  };

  const handleRenameSubmit = async (chatId: string) => {
    try {
      await axios.patch("/api/chat", {
        id: editingChatId,
        rename,
      });
      getAllUserChats();
    } catch (error: any) {
      console.log("[RENAME_SUBMIT]", error);
      toast.error(`${error.response.data.message}`)
    } finally {
      setEditingChatId(null);
      setRename("");
    }
  };

  const cancelRename = () => {
    setEditingChatId(null);
    setRename("");
  };

  useEffect(() => {
    getAllUserChats();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((c) => !c);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="space-y-2">
          <div className="flex items-center justify-between gap-1">
            <img
              onClick={(e) => toggleSidebar()}
              src={`/logo.svg`}
              className="h-8 w-8"
            />
            {open && <SidebarTrigger />}
          </div>

          <Button
            onClick={createNewChat}
            className="cursor-pointer rounded-[10px] bg-gradient-to-b from-[#5728f4] to-[#5100FF] text-[15px] text-white [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90"
          >
            {open ? "New Chat" : <Plus size={20} />}
          </Button>
        </SidebarHeader>
        <SidebarContent>
          {open && (
            <div>
              {chats.length > 0 ? (
                <div className="flex flex-col space-y-0.5 px-1.5 py-5">
                  {chats.map((chat) => (
                    <div
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      key={chat.id}
                      className={cn(
                        "group/chat flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm font-normal text-black transition hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-800",
                        params.id === chat.id &&
                          "bg-neutral-200 text-black dark:bg-neutral-800",
                      )}
                    >
                      {editingChatId === chat.id ? (
                        <input
                          ref={inputRef}
                          className="ring-offset-0 outline-none"
                          value={rename}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRenameSubmit(chat.id);
                            if (e.key === "Escape") cancelRename();
                          }}
                          onChange={(e) => setRename(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <span>{chat.title}</span>
                      )}
                      <span className="opacity-0 group-hover/chat:opacity-100">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="outline-none">
                            <BsThreeDots />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="">
                            <DropdownMenuItem>
                              <div
                                onClick={() => handleEdit(chat.id, chat.title)}
                                className="flex items-center gap-1.5"
                              >
                                <Pencil />
                                Rename
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(chat.id)}
                            >
                              <Trash2 className="text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground px-3 py-2">
                  {open && "No chats"}
                </span>
              )}
            </div>
          )}
          {!open && (
            <div className="mt-1 flex justify-center">
              <div
                onClick={() => setIsCommandOpen((c) => !c)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <Search size={15} />
              </div>
            </div>
          )}
        </SidebarContent>
        <SidebarFooter>
          {!session && (
            <button
              onClick={() => router.push("/auth")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#101010] py-2 font-mono text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              <LogIn size={18} />
              {open && "Login"}
            </button>
          )}
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer items-center justify-between gap-x-2 rounded-xl px-1 py-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image!}
                        alt={session.user.name}
                      />
                      <AvatarFallback>{session.user.name}</AvatarFallback>
                    </Avatar>
                    {open && (
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-normal">
                          {session.user.name}
                        </span>
                        <span className="text-muted-foreground text-xs capitalize">
                          free
                        </span>
                      </div>
                    )}
                  </div>
                  {open && (
                    <Badge variant={"outline"} className="rounded-full">
                      Upgrade
                    </Badge>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl">
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

      <CommandDialog
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        className="z-50 rounded-xl"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {chats.map((chat) => (
              <CommandItem
                onSelect={() => {
                  router.push(`/chat/${chat.id}`);
                }}
                className="cursor-pointer rounded-lg"
                key={chat.id}
              >
                {chat.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
