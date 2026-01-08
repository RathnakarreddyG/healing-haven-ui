import { useState } from "react";
import { 
  MessageSquarePlus, 
  Clock, 
  Hash, 
  Bookmark, 
  Sparkles, 
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatHistoryItem } from "@/types/chat";
import { ModeBadge } from "@/components/chat/ModeBadge";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeChat?: string;
  onChatSelect?: (id: string) => void;
}

const menuItems = [
  { icon: MessageSquarePlus, label: "New Chat", href: "/", isNew: true },
  { icon: Clock, label: "History", href: "#" },
  { icon: Hash, label: "Topics", href: "#" },
  { icon: Bookmark, label: "Saved", href: "#" },
  { icon: Sparkles, label: "Add-ons", href: "#" },
];

const chatHistory: ChatHistoryItem[] = [
  { id: "1", title: "Severe Stomach Pain", timestamp: "12 min ago", isActive: true, mode: "interactive" },
  { id: "2", title: "Cardiac Assessment", timestamp: "1 week ago", mode: "direct" },
  { id: "3", title: "Thigh Pain Evaluation", timestamp: "1 week ago", mode: "interactive" },
  { id: "4", title: "Diabetes Management", timestamp: "1 week ago", mode: "direct" },
  { id: "5", title: "Hypertension Review", timestamp: "1 week ago", mode: "interactive" },
  { id: "6", title: "Blood Cancer Subtypes", timestamp: "2 weeks ago", mode: "direct" },
  { id: "7", title: "ICU Transfusion Protocol", timestamp: "2 weeks ago", mode: "interactive" },
];

export function Sidebar({ isCollapsed = false, onToggle, activeChat, onChatSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside 
      className={cn(
        "flex flex-col h-full glass-sidebar transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-display font-bold text-xl text-sidebar-foreground">Healthelic</span>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary hover:text-white transition-colors z-10"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
              isCollapsed && "justify-center px-2",
              item.isNew && "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", item.isNew && "text-primary")} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
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
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-sm bg-sidebar-accent/50 border border-sidebar-border rounded-xl text-sidebar-foreground placeholder:text-sidebar-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      )}

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-muted px-3">
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

          <div className="mt-5 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-muted px-3">
              Previous
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

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <div className="relative">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-coral to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SD</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-400 rounded-full border-2 border-sidebar-background" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">SuperDave</p>
              <p className="text-xs text-sidebar-muted">Pro Member</p>
            </div>
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
        "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-primary/30 to-secondary/20 text-sidebar-accent-foreground border border-primary/30" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/70"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{chat.title}</p>
          <ModeBadge mode={chat.mode} size="sm" />
        </div>
        <p className="text-xs text-sidebar-muted">{chat.timestamp}</p>
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 flex items-center justify-center rounded-lg hover:bg-sidebar-accent text-sidebar-muted hover:text-sidebar-accent-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
