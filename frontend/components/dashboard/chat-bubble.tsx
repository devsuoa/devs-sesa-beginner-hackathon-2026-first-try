import { bubbleLayout } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  align?: "left" | "right";
  children: React.ReactNode;
  tone?: "accent" | "neutral";
}

export function ChatBubble({
  align = "left",
  children,
  tone = "accent",
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        bubbleLayout(),
        align === "right" && "ml-auto",
        tone === "accent"
          ? "bg-space-bubble text-white"
          : "bg-white text-black",
      )}
    >
      {children}
    </div>
  );
}
