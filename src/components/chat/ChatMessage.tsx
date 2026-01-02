import { Copy, Download, ThumbsUp, ThumbsDown, Bookmark, Volume2, ExternalLink } from "lucide-react";
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
      <div className={cn("flex justify-end gap-3 opacity-0 animate-fade-in", className)}>
        {messageNumber && (
          <div className="flex items-start pt-1">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center shadow-md">
              {messageNumber}
            </div>
          </div>
        )}
        <div className="max-w-[80%] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl rounded-tr-md px-5 py-4">
          <p className="text-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 opacity-0 animate-fade-in", className)}>
      <div className="bg-card border border-border rounded-2xl rounded-tl-md overflow-hidden shadow-card">
        {/* Content */}
        <div className="p-5">
          <div className="prose prose-sm max-w-none text-foreground">
            <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
          </div>
        </div>

        {/* References */}
        {references && references.length > 0 && (
          <div className="border-t border-border bg-muted/30 p-5">
            <h4 className="text-sm font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              References
            </h4>
            <ol className="space-y-2.5">
              {references.map((ref) => (
                <li key={ref.id} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-primary/10 text-primary text-xs font-semibold shrink-0">
                    {ref.id}
                  </span>
                  <span className="hover:text-primary cursor-pointer transition-colors">{ref.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 px-5 py-3 border-t border-border bg-muted/20">
          <ActionButton icon={Copy} tooltip="Copy" />
          <ActionButton icon={Download} tooltip="Download" />
          <div className="h-4 w-px bg-border mx-1" />
          <ActionButton icon={ThumbsUp} tooltip="Helpful" />
          <ActionButton icon={ThumbsDown} tooltip="Not helpful" />
          <div className="h-4 w-px bg-border mx-1" />
          <ActionButton icon={Bookmark} tooltip="Save" />
          <ActionButton icon={Volume2} tooltip="Read aloud" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, tooltip }: { icon: React.ElementType; tooltip: string }) {
  return (
    <button 
      title={tooltip}
      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]/g, '<span class="text-primary font-medium">[$1]</span>')
    .replace(/\n/g, '<br/>');
}
