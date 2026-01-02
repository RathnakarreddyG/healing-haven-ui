import { Copy, Download, ThumbsUp, ThumbsDown, Bookmark, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Reference {
  id: number;
  text: string;
}

interface ChatMessageProps {
  type: "user" | "assistant";
  content: string;
  references?: Reference[];
  messageNumber?: number;
  className?: string;
}

export function ChatMessage({ 
  type, 
  content, 
  references,
  messageNumber,
  className 
}: ChatMessageProps) {
  if (type === "user") {
    return (
      <div className={cn("flex justify-end animate-fade-in", className)}>
        <div className="flex items-start gap-3 max-w-[85%]">
          {messageNumber && (
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-medium shrink-0 mt-1">
              {messageNumber}
            </div>
          )}
          <div className="bg-chat-user rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm text-foreground leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 animate-fade-in", className)}>
      <div className="bg-chat-ai rounded-2xl rounded-tl-sm px-5 py-4 shadow-card border border-border">
        <div className="prose prose-sm max-w-none text-foreground">
          <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
        </div>

        {references && references.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">References</h4>
            <ol className="space-y-2">
              {references.map((ref) => (
                <li key={ref.id} className="text-sm text-primary leading-relaxed">
                  <span className="text-muted-foreground mr-1">{ref.id}.</span>
                  <span className="hover:underline cursor-pointer">{ref.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatContent(content: string): string {
  // Convert markdown-style formatting to HTML
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]/g, '<span class="text-primary font-medium">[$1]</span>')
    .replace(/\n/g, '<br/>');
}
