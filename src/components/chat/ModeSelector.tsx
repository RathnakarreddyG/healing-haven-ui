import { MessageCircle, Zap } from "lucide-react";
import { ChatMode } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  className?: string;
}

export function ModeSelector({ mode, onModeChange, className }: ModeSelectorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => onModeChange("interactive")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          mode === "interactive"
            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
        )}
      >
        <MessageCircle className="h-4 w-4" />
        Interactive
      </button>
      <button
        onClick={() => onModeChange("direct")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          mode === "direct"
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
        )}
      >
        <Zap className="h-4 w-4" />
        Direct
      </button>
    </div>
  );
}
