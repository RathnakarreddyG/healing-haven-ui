import { useState } from "react";
import { Clock, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  showHistory?: boolean;
  className?: string;
}

export function ChatInput({ 
  placeholder = "What laboratory tests should I order in an acute heart failure exacerbation?",
  onSend,
  showHistory = true,
  className
}: ChatInputProps) {
  const [message, setMessage] = useState("");

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
    <div className={cn("healthelic-card p-2", className)}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground bg-transparent resize-none focus:outline-none"
      />
      <div className="flex items-center justify-between px-2 pb-1">
        <div className="flex items-center gap-2">
          {showHistory && (
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
              <Clock className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="coral" size="sm" className="gap-2 px-4">
            <Mic className="h-4 w-4" />
            Voice
          </Button>
          {message.trim() && (
            <Button 
              size="icon-sm" 
              className="bg-primary text-primary-foreground"
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
