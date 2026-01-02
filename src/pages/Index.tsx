import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Navigate to chat page or handle message
  };

  const handleSelectQuestion = (question: string) => {
    console.log("Selected question:", question);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header userInitials="RA" />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Welcome Message */}
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Welcome, Dr. Ratnakar Reddy
              </h1>
              <p className="text-muted-foreground">
                How can I assist you today?
              </p>
            </div>

            {/* Chat Input */}
            <div className="mb-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <ChatInput 
                onSend={handleSendMessage}
                placeholder="What laboratory tests should I order in an acute heart failure exacerbation?"
              />
            </div>

            {/* Suggested Questions */}
            <SuggestedQuestions onSelect={handleSelectQuestion} />
          </div>
        </main>

        {/* Action buttons - bottom left, adjust position based on sidebar */}
        <div 
          className="fixed bottom-4 flex items-center gap-2 z-10 transition-all duration-300"
          style={{ left: sidebarCollapsed ? "80px" : "272px" }}
        >
          <ActionButton color="primary" />
          <ActionButton color="muted" />
          <ActionButton color="coral" />
          <ActionButton color="pink" />
        </div>

        {/* Report a Bug - bottom right */}
        <div className="fixed bottom-4 right-4 z-10">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground bg-card border border-border rounded-lg shadow-sm transition-colors">
            <BugIcon className="h-4 w-4" />
            Report a Bug
          </button>
        </div>
      </div>
    </div>
  );
};

function ActionButton({ color }: { color: string }) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary text-primary-foreground",
    muted: "bg-secondary text-muted-foreground",
    coral: "bg-coral text-coral-foreground",
    pink: "bg-pink-500 text-white",
  };

  return (
    <button className={`h-10 w-10 rounded-full ${colorClasses[color]} flex items-center justify-center shadow-md hover:scale-105 transition-transform`}>
      <IconPlaceholder />
    </button>
  );
}

function IconPlaceholder() {
  return <div className="h-4 w-4 rounded-sm bg-current opacity-60" />;
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2l1.5 1.5M16 2l-1.5 1.5M12 9v4M12 17h.01M9 9a3 3 0 016 0c0 2-3 3-3 3M7.5 11L6 10M16.5 11L18 10M7.5 15L5 16M16.5 15L19 16" />
    </svg>
  );
}

export default Index;
