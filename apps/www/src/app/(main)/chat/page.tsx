import { Chat } from "@/components/chat/chat";

export default async function ChatPage({ params }: { params: Promise<{ id: string }>}) {
  
  return (
    <Chat _messages={[]} />
  );
}
