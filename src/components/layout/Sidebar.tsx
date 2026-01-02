import { useState } from "react";
import { 
  MessageSquarePlus, 
  History, 
  Hash, 
  Bookmark, 
  Puzzle, 
  Search,
  MoreVertical,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeChat?: string;
  onChatSelect?: (id: string) => void;
}

const menuItems = [
  { icon: MessageSquarePlus, label: "New Chat", href: "/" },
  { icon: History, label: "History", href: "#" },
  { icon: Hash, label: "Topics", href: "#" },
  { icon: Bookmark, label: "Saved", href: "#" },
  { icon: Puzzle, label: "Add-ons", href: "#" },
];

const chatHistory: ChatHistoryItem[] = [
  { id: "1", title: "Severe Stomach Pain", timestamp: "12 minutes ago", isActive: true },
  { id: "2", title: "New Gen-AI Chat", timestamp: "1 week ago" },
  { id: "3", title: "Thigh Pain Evaluation", timestamp: "1 week ago" },
  { id: "4", title: "New Gen-AI Chat", timestamp: "1 week ago" },
  { id: "5", title: "New Gen-AI Chat", timestamp: "1 week ago" },
  { id: "6", title: "Blood Cancer Subty...", timestamp: "1 week ago" },
  { id: "7", title: "ICU Blood Transfusi...", timestamp: "1 week ago" },
];

export function Sidebar({ isCollapsed = false, onToggle, activeChat, onChatSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside 
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <span className="text-xs font-medium uppercase tracking-wider text-sidebar-muted">
            Menu
          </span>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggle}
          className="text-sidebar-muted hover:text-sidebar-foreground"
        >
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "healthelic-sidebar-item",
              isCollapsed && "justify-center px-2"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-muted" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-sidebar-accent/50 border border-sidebar-border rounded-lg text-sidebar-foreground placeholder:text-sidebar-muted focus:outline-none focus:ring-2 focus:ring-sidebar-ring/20"
            />
          </div>
        </div>
      )}

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
          <div className="mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-sidebar-muted px-2">
              Today
            </span>
          </div>
          <div className="space-y-1">
            {chatHistory.slice(0, 1).map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChat || chat.isActive}
                onClick={() => onChatSelect?.(chat.id)}
              />
            ))}
          </div>

          <div className="mt-4 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-sidebar-muted px-2">
              Previous 30 Days
            </span>
          </div>
          <div className="space-y-1">
            {chatHistory.slice(1).map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChat}
                onClick={() => onChatSelect?.(chat.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* User Avatar */}
      <div className="mt-auto p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-semibold text-sm">SD</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-sidebar" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-medium text-sidebar-foreground">SuperDave</span>
          )}
        </div>
      </div>
    </aside>
  );
}

function ChatItem({ 
  chat, 
  isActive, 
  onClick 
}: { 
  chat: ChatHistoryItem; 
  isActive?: boolean; 
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{chat.title}</p>
        <p className="text-xs text-sidebar-muted">{chat.timestamp}</p>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-sidebar-muted hover:text-sidebar-foreground"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}
