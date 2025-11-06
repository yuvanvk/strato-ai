import { Provider } from "@/providers/provider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Provider>
        {children}
        </Provider>
    </div>
}