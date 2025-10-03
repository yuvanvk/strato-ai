import { ChatInput } from "@/components/ui/chat-input";
import { ThemeToggler } from "@/components/ui/theme-toggler";

export default function ChatPage() {
    return <div>
        <div className="absolute top-4 right-5">
            <ThemeToggler />
        </div>
        <ChatInput />
    </div>
}