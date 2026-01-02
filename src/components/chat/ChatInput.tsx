import { useState } from "react";
import { Mic, Send, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  className?: string;
  size?: "default" | "large";
}

export function ChatInput({ 
  placeholder = "Ask me anything about patient care...",
  onSend,
  className,
  size = "default"
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-2xl transition-all duration-300",
        isFocused ? "shadow-glow" : "shadow-card",
        className
      )}
    >
      {/* Gradient border effect when focused */}
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none",
        isFocused ? "opacity-100" : "opacity-0"
      )} style={{
        padding: "1px",
        background: "linear-gradient(135deg, hsl(220 90% 56%) 0%, hsl(260 70% 60%) 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }} />
      
      <div className="relative bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 mt-1">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={size === "large" ? 3 : 2}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-base leading-relaxed"
          />
        </div>
        
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-10 px-5 rounded-xl bg-gradient-to-r from-coral to-pink-500 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
              <Mic className="h-4 w-4" />
              <span>Voice</span>
            </button>
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                message.trim() 
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:opacity-90" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
