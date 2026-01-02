import { useState, useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Button } from "@/components/ui/button";

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
      { id: 1, text: "BMJ Best Practice. Evaluation of chronic cough - Differentials. BMJ Best Practice US. 2025. doi:10.1136/bmjbestprac-2025-000000" },
      { id: 2, text: "Kasper DL, Fauci AS, Hauser SL, Longo DL, Jameson JL, Loscalzo J. Harrison's Principles of Internal Medicine. 20th ed. McGraw-Hill Education; 2018." },
      { id: 3, text: "WebMD. Is It Bronchitis or Pneumonia? WebMD. 2025." },
      { id: 4, text: "Mayo Clinic. Bronchitis - Symptoms and causes. Mayo Clinic. 2024." },
      { id: 5, text: "Physicians Alliance of Connecticut. 6 Types of Coughs and What They Mean. Physicians Alliance of Connecticut. 2024." },
      { id: 6, text: "Cleveland Clinic. Pneumonia: Causes, Symptoms, Diagnosis & Treatment. Cleveland Clinic. 2025." },
      { id: 7, text: "American Lung Association. Pneumonia Symptoms and Diagnosis. American Lung Association. 2025." },
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

  // Count user messages for numbering
  let userMessageCount = 0;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeChat="1"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header userInitials="RA" />

        {/* Message Counter Pills */}
        <div className="flex items-center justify-center gap-2 py-3 border-b border-border bg-card">
          <button className="h-6 w-6 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-accent transition-colors">
            1
          </button>
          <button className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            2
          </button>
        </div>

        {/* Messages */}
        <main 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto scrollbar-thin"
        >
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
            {messages.map((message) => {
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
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Chat Input */}
        <div className="border-t border-border bg-card p-4">
          <div className="max-w-3xl mx-auto relative">
            <ChatInput 
              onSend={handleSendMessage}
              placeholder="Ask a follow-up question..."
              showHistory={false}
            />
          </div>
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            onClick={scrollToBottom}
            size="icon"
            className="fixed bottom-24 right-8 rounded-full bg-primary text-primary-foreground shadow-lg z-20"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}

        {/* Action buttons - adjust position based on sidebar */}
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
      <div className="h-4 w-4 rounded-sm bg-current opacity-60" />
    </button>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2l1.5 1.5M16 2l-1.5 1.5M12 9v4M12 17h.01M9 9a3 3 0 016 0c0 2-3 3-3 3M7.5 11L6 10M16.5 11L18 10M7.5 15L5 16M16.5 15L19 16" />
    </svg>
  );
}

export default Chat;
