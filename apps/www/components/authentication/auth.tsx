import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

export const Auth = () => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen")}
    >
      <h1 className="text-4xl font-semibold font-sans tracking-tighter">
        Welcome to Strato AI
      </h1>

      <Button variant={"destructive"}>
        Subscribe
      </Button>
    </div>
  );
};
