import { MessageCircle, Zap } from "lucide-react";
import { ChatMode } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ModeBadgeProps {
  mode: ChatMode;
  size?: "sm" | "md";
  className?: string;
}

export function ModeBadge({ mode, size = "sm", className }: ModeBadgeProps) {
  const isInteractive = mode === "interactive";
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" 
          ? "px-1.5 py-0.5 text-[10px]" 
          : "px-2.5 py-1 text-xs",
        isInteractive
          ? "bg-primary/20 text-primary border border-primary/30"
          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        className
      )}
    >
      {isInteractive ? (
        <MessageCircle className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      ) : (
        <Zap className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      )}
      {size === "md" && (isInteractive ? "Interactive" : "Direct")}
      {size === "sm" && (isInteractive ? "INT" : "DIR")}
    </span>
  );
}
