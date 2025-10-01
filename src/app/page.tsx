import { ThemeToggler } from "@/components/ui/theme-toggler";

export default function Home() {
  return (
    <div>
      <div className="absolute top-4 right-5">
        <ThemeToggler />
      </div>
    </div>
  );
}
