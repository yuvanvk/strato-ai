import { Provider } from "@/providers/provider";
import { Toaster } from "sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Provider>
        {children}
        </Provider>
    </div>
}