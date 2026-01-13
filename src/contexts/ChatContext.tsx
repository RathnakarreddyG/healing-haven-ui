import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Message, ChatHistoryItem, ChatMode } from "@/types/chat";
import { generateSimulatedResponse, generateChatTitle } from "@/lib/chatSimulator";

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  mode: ChatMode;
  createdAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isTyping: boolean;
  createNewConversation: (mode: ChatMode) => string;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  getChatHistory: () => ChatHistoryItem[];
  currentMode: ChatMode;
  setCurrentMode: (mode: ChatMode) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Initial demo conversations
const initialConversations: Conversation[] = [
  {
    id: "demo-1",
    title: "Severe Stomach Pain",
    mode: "interactive",
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 min ago
    messages: [
      {
        id: "d1-1",
        type: "user",
        content: "Patient presents with severe stomach pain and vomiting for the past 6 hours",
      },
      {
        id: "d1-2",
        type: "assistant",
        content: `For evaluation of severe abdominal pain with vomiting, a systematic approach is recommended:

• **Initial Assessment** — Vital signs, pain characteristics (location, onset, radiation), associated symptoms. Red flags include fever, hypotension, peritoneal signs.

• **Laboratory Studies:**
  - CBC with differential (infection, anemia)
  - CMP (electrolytes, renal/hepatic function)
  - Lipase (pancreatitis)
  - Urinalysis (UTI, nephrolithiasis)`,
        references: [
          { id: 1, text: "Cartwright SL, McNamara RM. Evaluation of Acute Abdominal Pain. Am Fam Physician. 2008." },
          { id: 2, text: "Macaluso CR. Evaluation and Management of Acute Abdominal Pain. Int J Gen Med. 2012." },
        ],
      },
    ],
  },
  {
    id: "demo-2",
    title: "Cardiac Assessment",
    mode: "direct",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    messages: [
      {
        id: "d2-1",
        type: "user",
        content: "What labs for heart failure workup?",
      },
      {
        id: "d2-2",
        type: "assistant",
        content: `Key labs for heart failure:
• BNP/NT-proBNP
• CBC, BMP
• Troponin
• TSH, LFTs`,
        references: [
          { id: 1, text: "2021 ESC Heart Failure Guidelines." },
        ],
      },
    ],
  },
];

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>("interactive");

  const createNewConversation = useCallback((mode: ChatMode): string => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: "New Conversation",
      messages: [],
      mode,
      createdAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    return newConversation.id;
  }, []);

  const selectConversation = useCallback((id: string) => {
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
      setCurrentMode(conversation.mode);
    }
  }, [conversations]);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversation) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: "user",
      content,
    };

    // Update conversation with user message
    const updatedConversation: Conversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      // Update title from first message
      title: currentConversation.messages.length === 0 
        ? generateChatTitle(content) 
        : currentConversation.title,
    };

    setConversations((prev) =>
      prev.map((c) => (c.id === currentConversation.id ? updatedConversation : c))
    );
    setCurrentConversation(updatedConversation);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = await generateSimulatedResponse(content, currentConversation.mode);

      // Update with AI response
      const finalConversation: Conversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse],
      };

      setConversations((prev) =>
        prev.map((c) => (c.id === currentConversation.id ? finalConversation : c))
      );
      setCurrentConversation(finalConversation);
    } finally {
      setIsTyping(false);
    }
  }, [currentConversation]);

  const getChatHistory = useCallback((): ChatHistoryItem[] => {
    return conversations.map((conv) => ({
      id: conv.id,
      title: conv.title,
      timestamp: formatTimestamp(conv.createdAt),
      isActive: currentConversation?.id === conv.id,
      mode: conv.mode,
    }));
  }, [conversations, currentConversation]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        isTyping,
        createNewConversation,
        selectConversation,
        sendMessage,
        getChatHistory,
        currentMode,
        setCurrentMode,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}