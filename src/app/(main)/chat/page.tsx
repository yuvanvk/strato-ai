import { Chat } from "@/components/chat/chat";
import prisma from "@/lib/prisma";


export default async function ChatPage({ params }: { params: Promise<{ id: string }>}) {
    
    
  return (
    <Chat _messages={[]} />
  );
}
