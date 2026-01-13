import { useState, useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ModeBadge } from "@/components/chat/ModeBadge";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Play, BookOpen, BarChart3, Wrench, Bug } from "lucide-react";
import { ChatMode } from "@/types/chat";
import { useChat } from "@/contexts/ChatContext";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlMode = (searchParams.get("mode") as ChatMode) || "interactive";
  const initialMessage = searchParams.get("initial");
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasProcessedInitial, setHasProcessedInitial] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    currentConversation,
    isTyping,
    sendMessage,
    createNewConversation,
    selectConversation,
    getChatHistory,
    setCurrentMode,
  } = useChat();

  // Handle initial message from URL
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial) {
      setHasProcessedInitial(true);
      setCurrentMode(urlMode);
      
      // If no current conversation, create one
      if (!currentConversation || currentConversation.messages.length === 0) {
        sendMessage(decodeURIComponent(initialMessage));
      }
      
      // Clear the initial message from URL
      navigate(`/chat?mode=${urlMode}`, { replace: true });
    }
  }, [initialMessage, hasProcessedInitial, currentConversation, sendMessage, setCurrentMode, urlMode, navigate]);

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
  }, [currentConversation?.messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!currentConversation) {
      createNewConversation(urlMode);
    }
    await sendMessage(content);
  };

  const handleChatSelect = (id: string) => {
    selectConversation(id);
  };

  const handleNewChat = () => {
    navigate("/");
  };

  const messages = currentConversation?.messages || [];
  const chatHistory = getChatHistory();
  let userMessageCount = 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Decorative orbs */}
      <div className="floating-orb h-72 w-72 bg-secondary/20 top-20 right-20" />

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeChat={currentConversation?.id}
        chatHistory={chatHistory}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          userInitials="RR" 
          showNavPills={true}
          currentQuestion={messages.filter(m => m.type === "user").length}
          totalQuestions={messages.filter(m => m.type === "user").length}
        >
          <ModeBadge mode={currentConversation?.mode || urlMode} size="md" />
        </Header>

        {/* Messages */}
        <main 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto scrollbar-thin"
        >
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
            {messages.length === 0 && !isTyping && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Start a conversation by typing a message below.</p>
              </div>
            )}
            
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
                  className={`animate-fade-in`}
                />
              );
            })}
            
            {isTyping && <TypingIndicator className="animate-fade-in" />}
            
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