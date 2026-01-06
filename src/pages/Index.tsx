import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";
import { ModeSelector } from "@/components/chat/ModeSelector";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, BarChart3, Wrench, Bug } from "lucide-react";
import { ChatMode } from "@/types/chat";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("interactive");
  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    navigate(`/chat?mode=${chatMode}`);
  };

  const handleSelectQuestion = (question: string) => {
    console.log("Selected question:", question);
    navigate(`/chat?mode=${chatMode}`);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Decorative orbs */}
      <div className="floating-orb h-96 w-96 bg-primary/30 -top-48 -right-48" />
      <div className="floating-orb h-72 w-72 bg-secondary/20 bottom-20 left-1/3" />

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header userInitials="RR" />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-16">
            {/* Welcome Section */}
            <div className="text-center mb-12 opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">AI Medical Assistant</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Welcome, <span className="gradient-text">Dr. Ratnakar</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Your intelligent companion for evidence-based clinical decisions
              </p>
            </div>

            {/* Mode Selector */}
            <div className="mb-6 opacity-0 animate-fade-in flex justify-center" style={{ animationDelay: "100ms" }}>
              <ModeSelector mode={chatMode} onModeChange={setChatMode} />
            </div>

            {/* Chat Input */}
            <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <ChatInput 
                onSend={handleSendMessage}
                placeholder="What laboratory tests should I order in an acute heart failure exacerbation?"
                size="large"
              />
            </div>

            {/* Suggested Questions */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <SuggestedQuestions onSelect={handleSelectQuestion} />
            </div>
          </div>
        </main>

        {/* Floating Action Buttons */}
        <div 
          className="fixed bottom-6 flex items-center gap-3 z-10 transition-all duration-300"
          style={{ left: sidebarCollapsed ? "96px" : "304px" }}
        >
          <FloatingButton icon={Play} gradient="from-primary to-secondary" />
          <FloatingButton icon={BookOpen} color="bg-muted" textColor="text-muted-foreground" />
          <FloatingButton icon={BarChart3} gradient="from-coral to-pink-500" />
          <FloatingButton icon={Wrench} color="bg-purple-500" textColor="text-white" />
        </div>

        {/* Report Bug */}
        <button className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground bg-card border border-border rounded-xl shadow-card hover:shadow-md transition-all z-10">
          <Bug className="h-4 w-4" />
          Report a Bug
        </button>
      </div>
    </div>
  );
};

function FloatingButton({ 
  icon: Icon, 
  gradient, 
  color, 
  textColor = "text-white" 
}: { 
  icon: React.ElementType; 
  gradient?: string; 
  color?: string;
  textColor?: string;
}) {
  return (
    <button 
      className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${
        gradient ? `bg-gradient-to-br ${gradient}` : color
      } ${textColor}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

export default Index;
