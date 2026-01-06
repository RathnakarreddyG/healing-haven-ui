import { Moon, Bell, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeaderProps {
  userName?: string;
  userInitials?: string;
  showNavPills?: boolean;
  currentQuestion?: number;
  totalQuestions?: number;
  children?: ReactNode;
}

export function Header({ 
  userInitials = "RA",
  showNavPills = false,
  currentQuestion = 1,
  totalQuestions = 2,
  children
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-between px-6">
      {/* Left - Breadcrumb or empty */}
      <div className="flex items-center gap-3">
        {showNavPills && (
          <div className="flex items-center gap-2 bg-muted/50 rounded-full p-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <button
                key={i}
                className={`h-8 w-8 rounded-full text-xs font-semibold transition-all ${
                  i + 1 === currentQuestion
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {children}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-xl">
          <Moon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-xl relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-coral rounded-full animate-pulse" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-xl">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="ghost" className="gap-2 rounded-xl hover:bg-accent">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-primary/20 flex items-center justify-center border border-primary/20">
            <span className="text-sm font-semibold text-primary">{userInitials}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
