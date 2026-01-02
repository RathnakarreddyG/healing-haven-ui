import { useState, useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Play, BookOpen, BarChart3, Wrench, Bug } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  references?: { id: number; text: string }[];
}

const sampleMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content: `Chest X-ray (CXR) is a primary imaging tool that can detect infiltrates, consolidation, or pleural effusions. It can also show hyperinflation in COPD or other lung pathologies. [1, 2, 3]

• **Computed Tomography (CT) scan of the chest** — If the CXR is inconclusive, or if there is suspicion for complications (e.g., empyema, abscess), or alternative diagnoses like pulmonary embolism or bronchiectasis. [1, 2]`,
    references: [
      { id: 1, text: "BMJ Best Practice. Evaluation of chronic cough - Differentials. BMJ Best Practice US. 2025." },
      { id: 2, text: "Kasper DL, et al. Harrison's Principles of Internal Medicine. 20th ed. McGraw-Hill; 2018." },
      { id: 3, text: "WebMD. Is It Bronchitis or Pneumonia? WebMD. 2025." },
      { id: 4, text: "Mayo Clinic. Bronchitis - Symptoms and causes. Mayo Clinic. 2024." },
      { id: 5, text: "Cleveland Clinic. Pneumonia: Causes, Symptoms, Diagnosis & Treatment. 2025." },
    ],
  },
  {
    id: "2",
    type: "user",
    content: "Patient has severe stomach pain and vomiting",
  },
  {
    id: "3",
    type: "assistant",
    content: "Let me research the latest clinical evidence for severe abdominal pain and vomiting.",
  },
];

const Chat = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
    };
    setMessages([...messages, newMessage]);
  };

  let userMessageCount = 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Decorative orbs */}
      <div className="floating-orb h-72 w-72 bg-secondary/20 top-20 right-20" />

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeChat="1"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          userInitials="RR" 
          showNavPills={true}
          currentQuestion={2}
          totalQuestions={2}
        />

        {/* Messages */}
        <main 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto scrollbar-thin"
        >
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
            {messages.map((message, index) => {
              if (message.type === "user") {
                userMessageCount++;
              }
              return (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  content={message.content}
                  references={message.references}
                  messageNumber={message.type === "user" ? userMessageCount : undefined}
                  className={`animation-delay-${index * 100}`}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Chat Input */}
        <div className="border-t border-border/50 bg-card/50 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput 
              onSend={handleSendMessage}
              placeholder="Ask a follow-up question..."
            />
          </div>
        </div>

        {/* Scroll to bottom */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-28 right-8 h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-20"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        )}

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

export default Chat;
