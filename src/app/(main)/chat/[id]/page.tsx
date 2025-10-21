import { Chat } from "@/components/chat/chat";
import prisma from "@/lib/prisma";

export default async function IndividualChatPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    const chat = await prisma.message.findMany({
      where: {
        chatId: id
      },
      orderBy: {
        createdAt: "asc"
      },
    })
    const messages = chat.map((c) => ({ message: c.content, role: c.role === "AI" ? "ai" as const : "user" as const}))
    
  return (
    <Chat _messages={messages} />
  );
}